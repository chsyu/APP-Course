import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, ensureAuthReady } from '../config/firebase';
import { deleteSharedDiary, upsertSharedDiary } from './sharedJournalService';

/** 日記條目歸屬的日記本 id；舊文件無此欄位時視為 default */
export const DEFAULT_JOURNAL_ID = 'default';

/** AsyncStorage：上次成功從雲端拉取並合併的時間（ISO 字串） */
export const DIARY_LAST_CLOUD_SYNC_AT_KEY = '@diary_last_cloud_sync_at';

function permissionError() {
  return {
    success: false,
    error:
      '資料庫權限不足：請確認 Firestore rules 已部署，且目前登入帳號可讀寫 users/{uid}/diaries',
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
 * @param {string} uid
 * @returns {Promise<{ success: true, diaries: Array<{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs: number, latitude?: number, longitude?: number }> } | { success: false, error: string }>}
 */
export async function fetchDiariesFromFirestore(uid) {
  if (!db) {
    return { success: false, error: '無法連線至資料庫' };
  }
  if (!uid) {
    return { success: false, error: '請先登入' };
  }

  try {
    await ensureAuthReady();
    const snap = await getDocs(collection(db, 'users', uid, 'diaries'));
    const diaries = snap.docs.map((d) => {
      const data = d.data();
      const journalId =
        data.journalId != null && String(data.journalId) !== ''
          ? String(data.journalId)
          : DEFAULT_JOURNAL_ID;
      const createdByEmail =
        data.createdByEmail != null && String(data.createdByEmail).trim() !== ''
          ? String(data.createdByEmail).trim().toLowerCase()
          : '';
      const lastEditedByEmail =
        data.lastEditedByEmail != null && String(data.lastEditedByEmail).trim() !== ''
          ? String(data.lastEditedByEmail).trim().toLowerCase()
          : '';
      return {
        id: data.id ?? d.id,
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
    });
    return { success: true, diaries };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '讀取雲端日記失敗' };
  }
}

/**
 * @param {string} uid
 * @param {{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs?: number, journalId?: string, latitude?: number, longitude?: number }} diary
 * @returns {Promise<{ success: true } | { success: false, error: string }>}
 */
export async function upsertDiaryToFirestore(uid, diary) {
  if (!db) {
    return { success: false, error: '無法連線至資料庫' };
  }
  if (!uid || !diary?.id) {
    return { success: false, error: '請先登入或日記 id 無效' };
  }

  try {
    const payload = {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      date: diary.date,
      modifiedDate: diary.modifiedDate ?? null,
      updatedAt: serverTimestamp(),
      journalId:
        diary.journalId != null && String(diary.journalId) !== ''
          ? String(diary.journalId)
          : DEFAULT_JOURNAL_ID,
    };
    if (diary.latitude != null && diary.longitude != null) {
      payload.latitude = diary.latitude;
      payload.longitude = diary.longitude;
    }
    if (diary.createdByEmail) payload.createdByEmail = String(diary.createdByEmail).trim().toLowerCase();
    if (diary.lastEditedByEmail) {
      payload.lastEditedByEmail = String(diary.lastEditedByEmail).trim().toLowerCase();
    }
    await setDoc(doc(db, 'users', uid, 'diaries', diary.id), payload, { merge: true });
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '同步日記至雲端失敗' };
  }
}

/**
 * @param {string} uid
 * @param {string} diaryId
 * @returns {Promise<{ success: true } | { success: false, error: string }>}
 */
export async function deleteDiaryFromFirestore(uid, diaryId) {
  if (!db) {
    return { success: false, error: '無法連線至資料庫' };
  }
  if (!uid || !diaryId) {
    return { success: false, error: '請先登入或日記 id 無效' };
  }

  try {
    await deleteDoc(doc(db, 'users', uid, 'diaries', diaryId));
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return permissionError();
    }
    return { success: false, error: e?.message || '從雲端刪除日記失敗' };
  }
}

/** @param {{ kind?: string } | null | undefined} journal */
export function isSharedJournalEntry(journal) {
  return journal?.kind === 'shared';
}

/**
 * @param {string} uid
 * @param {{ id: string, journalId?: string } & Record<string, unknown>} diary
 * @param {{ kind?: string } | null | undefined} journal
 */
export async function syncDiaryUpsert(uid, diary, journal) {
  if (isSharedJournalEntry(journal)) {
    const jid =
      diary.journalId != null && String(diary.journalId) !== '' ? String(diary.journalId) : null;
    if (!jid) return { success: false, error: '分享日誌 id 無效' };
    return upsertSharedDiary(jid, diary);
  }
  return upsertDiaryToFirestore(uid, diary);
}

/**
 * @param {string} uid
 * @param {{ id: string, journalId?: string } & Record<string, unknown>} diary
 * @param {{ kind?: string } | null | undefined} journal
 */
export async function syncDiaryDelete(uid, diary, journal) {
  if (isSharedJournalEntry(journal)) {
    const jid =
      diary.journalId != null && String(diary.journalId) !== '' ? String(diary.journalId) : null;
    if (!jid) return { success: false, error: '分享日誌 id 無效' };
    return deleteSharedDiary(jid, diary.id);
  }
  return deleteDiaryFromFirestore(uid, diary.id);
}
