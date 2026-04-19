import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { normalizeAuthEmail } from './userService';

const SHARED_JOURNALS = 'sharedJournals';

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
 * @param {{ name: string, ownerUid: string, memberEmails: string[] }} args memberEmails 須為小寫
 * @returns {Promise<{ success: true, journalId: string } | { success: false, error: string }>}
 */
export async function createSharedJournal({ name, ownerUid, memberEmails }) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
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
    return { success: true, journalId: ref.id };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '建立分享日誌失敗' };
  }
}

/**
 * @param {string} journalId
 * @param {{ name?: string, memberEmails?: string[] }} patch
 */
export async function updateSharedJournalMeta(journalId, patch) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  if (!journalId) return { success: false, error: '日誌 id 無效' };
  try {
    const ref = doc(db, SHARED_JOURNALS, journalId);
    const payload = { updatedAt: serverTimestamp() };
    if (typeof patch.name === 'string') payload.name = patch.name.trim() || '分享日誌';
    if (Array.isArray(patch.memberEmails)) payload.memberEmails = patch.memberEmails;
    await setDoc(ref, payload, { merge: true });
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '更新分享日誌失敗' };
  }
}

/**
 * @param {string} userEmailLower normalizeAuthEmail 後的 email
 * @returns {Promise<{ success: true, journals: Array<{ id: string, name: string, ownerUid: string, memberEmails: string[] }> } | { success: false, error: string }>}
 */
export async function fetchSharedJournalsForUser(userEmailLower) {
  if (!db) return { success: false, error: '無法連線至資料庫' };
  const key = normalizeAuthEmail(userEmailLower);
  if (!key) return { success: false, error: '請先登入且帳號需有 Email' };
  try {
    const q = query(collection(db, SHARED_JOURNALS), where('memberEmails', 'array-contains', key));
    const snap = await getDocs(q);
    const journals = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name ?? '分享日誌',
        ownerUid: data.ownerUid ?? '',
        memberEmails: Array.isArray(data.memberEmails)
          ? data.memberEmails.map((e) => normalizeAuthEmail(e)).filter(Boolean)
          : [],
      };
    });
    return { success: true, journals };
  } catch (e) {
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
  if (!journalId || !diary?.id) return { success: false, error: '參數無效' };
  try {
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
