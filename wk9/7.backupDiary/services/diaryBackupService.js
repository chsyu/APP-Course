import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * @param {string} uid
 * @param {Array<{ id: string, title: string, content: string, date: string, modifiedDate: string | null }>} diaries
 * @returns {Promise<{ success: true } | { success: false, error: string }>}
 */
export async function backupDiariesToFirestore(uid, diaries) {
  if (!db) {
    return { success: false, error: '無法連線至資料庫' };
  }
  if (!uid) {
    return { success: false, error: '請先登入後再備份' };
  }
  if (!Array.isArray(diaries)) {
    return { success: false, error: '日記資料格式錯誤' };
  }

  try {
    for (const diary of diaries) {
      await setDoc(
        doc(db, 'users', uid, 'diaries', diary.id),
        {
          id: diary.id,
          title: diary.title,
          content: diary.content,
          date: diary.date,
          modifiedDate: diary.modifiedDate ?? null,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return {
        success: false,
        error: '資料庫權限不足：請確認 Firestore rules 已部署，且目前登入帳號可寫入 users/{uid}/diaries',
      };
    }
    return {
      success: false,
      error: e?.message || '備份失敗',
    };
  }
}
