import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

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
    const snap = await getDocs(collection(db, 'users', uid, 'diaries'));
    const diaries = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: data.id ?? d.id,
        title: data.title ?? '',
        content: data.content ?? '',
        date: data.date ?? '',
        modifiedDate: data.modifiedDate ?? null,
        updatedAtMs: readUpdatedAtMs(data),
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
 * @param {{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs?: number, latitude?: number, longitude?: number }} diary
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
    };
    if (diary.latitude != null && diary.longitude != null) {
      payload.latitude = diary.latitude;
      payload.longitude = diary.longitude;
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
