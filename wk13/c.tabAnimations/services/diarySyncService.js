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
 * @returns {Promise<{ success: true, diaries: Array<{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs: number, weatherAtCreate?: { condition: string, value: string, periodStart?: string }, latitude?: number, longitude?: number }> } | { success: false, error: string }>}
 */
export async function fetchDiariesFromFirestore(uid) {

  try {
    const snap = await getDocs(collection(db, 'users', uid, 'diaries'));
    const diaries = snap.docs.map((d) => {
      const data = d.data();
      const w = data.weatherAtCreate;
      const weatherAtCreate =
        w &&
        typeof w === 'object' &&
        typeof w.condition === 'string' &&
        typeof w.value === 'string'
          ? {
              condition: w.condition,
              value: w.value,
              ...(typeof w.periodStart === 'string' ? { periodStart: w.periodStart } : {}),
            }
          : undefined;
      return {
        id: data.id ?? d.id,
        title: data.title ?? '',
        content: data.content ?? '',
        date: data.date ?? '',
        modifiedDate: data.modifiedDate ?? null,
        updatedAtMs: readUpdatedAtMs(data),
        ...(weatherAtCreate ? { weatherAtCreate } : {}),
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
 * @param {{ id: string, title: string, content: string, date: string, modifiedDate: string | null, updatedAtMs?: number, weatherAtCreate?: { condition: string, value: string, periodStart?: string }, latitude?: number, longitude?: number }} diary
 * @returns {Promise<{ success: true } | { success: false, error: string }>}
 */
export async function upsertDiaryToFirestore(uid, diary) {

  try {
    const payload = {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      date: diary.date,
      modifiedDate: diary.modifiedDate ?? null,
      updatedAt: serverTimestamp(),
    };
    const w = diary.weatherAtCreate;
    if (
      w &&
      typeof w.condition === 'string' &&
      typeof w.value === 'string'
    ) {
      payload.weatherAtCreate = {
        condition: w.condition,
        value: w.value,
        ...(typeof w.periodStart === 'string' ? { periodStart: w.periodStart } : {}),
      };
    }
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
