import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, ensureAuthReady } from '../config/firebase';
import { normalizeAuthEmail } from './userService';

const SHARED_JOURNALS = 'sharedJournals';
const USER_SHARED_JOURNAL_REFS = 'userSharedJournalRefs';

function permissionError() {
  return {
    success: false,
    error:
      '資料庫權限不足：請確認 Firestore rules 已部署，且帳號為分享日誌的成員',
  };
}

/**
 * @param {import('firebase/firestore').DocumentData} data
 * @returns {number}
 */
function readUpdatedAtMs(data) {
  const ua = data?.updatedAt;
  if (ua && typeof ua.toMillis === 'function') return ua.toMillis();
  return 0;
}

/**
 * @param {string} journalId
 * @param {import('firebase/firestore').QueryDocumentSnapshot} docSnap
 */
function mapDiaryDoc(journalId, docSnap) {
  const data = docSnap.data();
  const createdByEmail = normalizeAuthEmail(data.createdByEmail);
  const lastEditedByEmail = normalizeAuthEmail(data.lastEditedByEmail);
  return {
    id: data.id ?? docSnap.id,
    title: data.title ?? '',
    content: data.content ?? '',
    date: data.date ?? '',
    modifiedDate: data.modifiedDate ?? null,
    updatedAtMs: readUpdatedAtMs(data),
    journalId,
    ...(createdByEmail ? { createdByEmail } : {}),
    ...(lastEditedByEmail ? { lastEditedByEmail } : {}),
    ...(data.latitude != null && data.longitude != null
      ? { latitude: data.latitude, longitude: data.longitude }
      : {}),
  };
}

/**
 * 每位成員一筆 `userSharedJournalRefs/{小寫email}/journals/{journalId}`；list 僅掃描自己 email 子路徑，規則易與查詢對齊。
 */
export async function syncSharedJournalMemberRefs(journalId, memberEmails) {
  if (!db || !journalId || !Array.isArray(memberEmails)) return { success: false };
  await ensureAuthReady();
  const emails = Array.from(new Set(memberEmails.map((e) => normalizeAuthEmail(e)).filter(Boolean)));
  if (emails.length === 0) return { success: true };
  try {
    await Promise.all(
      emails.map((emailKey) =>
        setDoc(
          doc(db, USER_SHARED_JOURNAL_REFS, emailKey, 'journals', journalId),
          { journalId, updatedAt: serverTimestamp() },
          { merge: true }
        )
      )
    );
    return { success: true };
  } catch (e) {
    if (__DEV__) {
      console.warn('[syncSharedJournalMemberRefs]', e?.code, e?.message);
    }
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return {
        success: false,
        error:
          '資料庫權限不足：請確認 Firestore rules 已部署，且帳號為分享日誌的擁有者（寫入成員索引須先能讀取 sharedJournals）。',
      };
    }
    return { success: false, error: e?.message || 'sync refs failed' };
  }
}

export async function deleteSharedJournalMemberRef(journalId, emailKey) {
  if (!db || !journalId) return { success: false };
  const key = normalizeAuthEmail(emailKey);
  if (!key) return { success: false };
  await ensureAuthReady();
  try {
    await deleteDoc(doc(db, USER_SHARED_JOURNAL_REFS, key, 'journals', journalId));
    return { success: true };
  } catch (e) {
    if (__DEV__) console.warn('[deleteSharedJournalMemberRef]', e?.code, e?.message);
    return { success: false };
  }
}

/**
 * @param {{ name: string, ownerUid: string, memberEmails: string[] }} args memberEmails 須為小寫
 * @returns {Promise<{ success: true, journalId: string } | { success: false, error: string }>}
 */
export async function createSharedJournal({ name, ownerUid, memberEmails }) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();
  if (!ownerUid || !Array.isArray(memberEmails) || memberEmails.length === 0) {
    return { success: false, error: '成員列表無效' };
  }
  try {
    const ref = doc(collection(db, SHARED_JOURNALS));
    await setDoc(ref, {
      name: (name || '').trim() || '分享日誌',
      ownerUid,
      memberEmails,
      updatedAt: serverTimestamp(),
    });
    await syncSharedJournalMemberRefs(ref.id, memberEmails);
    return { success: true, journalId: ref.id };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '建立分享日誌失敗' };
  }
}

/**
 * 遠端 `sharedJournals/{journalId}` 若已被刪除，`merge` 會變成「建立」不完整文件 → 規則拒絕。
 * 此時須帶齊 `ownerUid` 與 `memberEmails`（由本機 journal 傳入）以整份重建 meta。
 *
 * @param {string} journalId
 * @param {{ name?: string, memberEmails?: string[], ownerUid?: string }} patch
 */
export async function updateSharedJournalMeta(journalId, patch) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();
  if (auth?.currentUser) {
    try {
      await auth.currentUser.getIdToken(true);
    } catch {
      // ignore
    }
  }
  if (!journalId) return { success: false, error: '日誌 id 無效' };
  try {
    const ref = doc(db, SHARED_JOURNALS, journalId);
    let snap;
    try {
      snap = await getDoc(ref);
    } catch (readErr) {
      if (readErr?.code === 'permission-denied' || readErr?.code === 'firestore/permission-denied') {
        if (__DEV__) {
          console.warn(
            '[updateSharedJournalMeta] getDoc denied, will try rebuild',
            journalId,
            readErr?.message
          );
        }
        snap = { exists: () => false, data: () => null };
      } else {
        throw readErr;
      }
    }
    const prev = snap.exists() ? snap.data() : null;

    const payload = { updatedAt: serverTimestamp() };
    if (typeof patch.name === 'string') payload.name = patch.name.trim() || '分享日誌';
    if (Array.isArray(patch.memberEmails)) payload.memberEmails = patch.memberEmails;

    // 主控台刪除集合後可能殘留空文件，或僅有部分欄位；此時 merge update 會違反規則，改為整份覆寫
    const metaLooksValid =
      snap.exists() &&
      typeof prev?.ownerUid === 'string' &&
      prev.ownerUid.length > 0 &&
      Array.isArray(prev.memberEmails) &&
      prev.memberEmails.length > 0;

    if (!metaLooksValid) {
      const ownerUid = patch.ownerUid;
      if (!ownerUid || typeof ownerUid !== 'string') {
        return {
          success: false,
          error:
            '雲端找不到此分享日誌（可能已在主控台刪除）。請擁有者在此日誌「編輯成員」再按儲存一次，以用本機資料重建雲端；或改建立新的分享日誌。',
        };
      }
      if (!Array.isArray(payload.memberEmails) || payload.memberEmails.length === 0) {
        return {
          success: false,
          error: '重建雲端分享日誌時須包含成員 email 列表（請由編輯成員儲存，勿僅改日誌名稱）。',
        };
      }
      payload.ownerUid = ownerUid;
      if (typeof payload.name !== 'string' || !payload.name) {
        payload.name = '分享日誌';
      }
      await setDoc(ref, payload);
      return { success: true };
    }

    await setDoc(ref, payload, { merge: true });
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      if (__DEV__) {
        console.warn('[updateSharedJournalMeta] write denied', journalId, e?.code, e?.message);
      }
      return permissionError();
    }
    return { success: false, error: e?.message || '更新分享日誌失敗' };
  }
}

/**
 * 查詢條件必須與 Firestore rules 使用的 `request.auth.token.email`（小寫）一致，
 * 否則 rules 會認定查詢與身分不一致而整段 permission-denied。
 * 因此一律以 `auth.currentUser.email` 為準，忽略呼叫端傳入的參數（僅在 __DEV__ 比對提示）。
 * 優先讀 `userSharedJournalRefs/{小寫email}/journals`（與規則對齊）；無資料時再 fallback `array-contains`。
 *
 * @param {string} [_userEmailLower] 已廢棄作為查詢值，保留參數避免既有呼叫點改動
 */
export async function fetchSharedJournalsForUser(_userEmailLower) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();

  const cu = auth?.currentUser;
  if (!cu) {
    return { success: false, error: '尚未登入 Firebase Auth，無法查詢分享日誌' };
  }

  let email = cu.email;
  if (!email) {
    try {
      await cu.reload();
      email = cu.email ?? null;
    } catch {
      // ignore
    }
  }
  if (!email) {
    return {
      success: false,
      error:
        '目前登入方式未提供 Email，無法查詢分享日誌（Firestore 規則依 JWT 的 email 比對 memberEmails）',
    };
  }

  const keyFromAuth = normalizeAuthEmail(email);
  if (!keyFromAuth) {
    return { success: false, error: 'Auth email 無效' };
  }

  const paramKey = normalizeAuthEmail(_userEmailLower);
  if (__DEV__ && paramKey && paramKey !== keyFromAuth) {
    console.warn('[fetchSharedJournalsForUser] 呼叫端 email 與 Auth 不一致，查詢已改用 Auth', {
      paramKey,
      keyFromAuth,
    });
  }

  try {
    try {
      await cu.getIdToken(true);
    } catch (tokenErr) {
      if (__DEV__) console.warn('[fetchSharedJournalsForUser] getIdToken 刷新略過', tokenErr?.message);
    }

    /** @param {import('firebase/firestore').DocumentSnapshot} metaSnap */
    const mapMetaSnap = (metaSnap) => {
      const data = metaSnap.data() || {};
      return {
        id: metaSnap.id,
        name: data.name ?? '分享日誌',
        ownerUid: data.ownerUid ?? '',
        memberEmails: Array.isArray(data.memberEmails)
          ? data.memberEmails.map((e) => normalizeAuthEmail(e)).filter(Boolean)
          : [],
      };
    };

    try {
      const refSnap = await getDocs(
        collection(db, USER_SHARED_JOURNAL_REFS, keyFromAuth, 'journals')
      );
      const fromRefs = [];
      for (const refDoc of refSnap.docs) {
        const journalId = refDoc.id;
        const metaSnap = await getDoc(doc(db, SHARED_JOURNALS, journalId));
        if (metaSnap.exists()) fromRefs.push(mapMetaSnap(metaSnap));
      }
      if (fromRefs.length > 0) {
        return { success: true, journals: fromRefs };
      }
    } catch (refErr) {
      if (__DEV__) {
        console.warn('[fetchSharedJournalsForUser] ref 索引查詢', refErr?.code, refErr?.message);
      }
    }

    const q = query(
      collection(db, SHARED_JOURNALS),
      where('memberEmails', 'array-contains', keyFromAuth)
    );
    const snap = await getDocs(q);
    const journals = snap.docs.map((d) => mapMetaSnap(d));
    return { success: true, journals };
  } catch (e) {
    if (__DEV__) {
      console.warn('[fetchSharedJournalsForUser] Firestore 錯誤', e?.code, e?.message);
    }
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '讀取分享日誌失敗' };
  }
}

/**
 * @param {string} journalId
 * @returns {Promise<{ success: true, diaries: object[] } | { success: false, error: string }>}
 */
export async function fetchSharedDiaries(journalId) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();
  if (auth?.currentUser) {
    try {
      await auth.currentUser.getIdToken(true);
    } catch {
      // ignore
    }
  }
  if (!journalId) return { success: false, error: '日誌 id 無效' };
  try {
    const snap = await getDocs(collection(db, SHARED_JOURNALS, journalId, 'diaries'));
    const diaries = snap.docs.map((d) => mapDiaryDoc(journalId, d));
    return { success: true, diaries };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '讀取分享日記失敗' };
  }
}

/**
 * @param {string} journalId
 * @param {{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs?: number, latitude?: number, longitude?: number }} diary
 */
export async function upsertSharedDiary(journalId, diary) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();
  if (auth?.currentUser) {
    try {
      await auth.currentUser.getIdToken(true);
    } catch {
      // ignore
    }
  }
  if (!journalId || !diary?.id) return { success: false, error: '參數無效' };
  try {
    const metaSnap = await getDoc(doc(db, SHARED_JOURNALS, journalId));
    if (!metaSnap.exists()) {
      return {
        success: false,
        error:
          '此分享日誌在雲端不存在（可能已在主控台刪除）。請擁有者先於「編輯成員」儲存以重建雲端，再同步。',
      };
    }

    const payload = {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      date: diary.date,
      modifiedDate: diary.modifiedDate ?? null,
      updatedAt: serverTimestamp(),
      journalId,
    };
    if (diary.latitude != null && diary.longitude != null) {
      payload.latitude = diary.latitude;
      payload.longitude = diary.longitude;
    }
    const cbe = normalizeAuthEmail(diary.createdByEmail);
    const lbe = normalizeAuthEmail(diary.lastEditedByEmail);
    if (cbe) payload.createdByEmail = cbe;
    if (lbe) payload.lastEditedByEmail = lbe;
    await setDoc(doc(db, SHARED_JOURNALS, journalId, 'diaries', diary.id), payload, { merge: true });
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '同步分享日記失敗' };
  }
}

/**
 * @param {string} journalId
 * @param {string} diaryId
 */
export async function deleteSharedDiary(journalId, diaryId) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  await ensureAuthReady();
  if (!journalId || !diaryId) return { success: false, error: '參數無效' };
  try {
    await deleteDoc(doc(db, SHARED_JOURNALS, journalId, 'diaries', diaryId));
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '刪除分享日記失敗' };
  }
}
