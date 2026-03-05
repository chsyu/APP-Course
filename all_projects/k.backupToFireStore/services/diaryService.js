import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * 獲取本地日記的最後修改時間戳（ISO 8601）
 * @param {Object} diary - 本地日記對象
 * @returns {string} ISO 8601 時間戳
 */
const getLocalDiaryTimestamp = (diary) => {
  // 使用 lastModifiedTimestamp，如果沒有則使用當前時間
  return diary.lastModifiedTimestamp || new Date().toISOString();
};

/**
 * 將日記同步到 Firestore
 * @param {string} userId - 用戶 ID
 * @param {Array} diaries - 日記陣列
 * @returns {Promise<{success: boolean, error: string|null, syncedCount: number}>}
 */
export const syncDiariesToFirestore = async (userId, diaries) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }

    if (!userId) {
      throw new Error('用戶 ID 不能為空');
    }

    if (!Array.isArray(diaries)) {
      throw new Error('日記資料必須是陣列');
    }

    // 使用 batch 進行批量寫入（最多 500 個操作）
    let syncedCount = 0;

    // 分批處理（每批最多 500 個）
    const batchSize = 500;
    for (let i = 0; i < diaries.length; i += batchSize) {
      const batchDiaries = diaries.slice(i, i + batchSize);
      
      // 先批量查詢所有文檔是否存在
      const diaryRefs = batchDiaries.map(diary => doc(db, 'diaries', diary.id));
      const diarySnaps = await Promise.all(diaryRefs.map(ref => getDoc(ref)));
      
      // 建立文檔存在性的映射
      const existingDocs = new Set();
      diarySnaps.forEach((snap, index) => {
        if (snap.exists()) {
          existingDocs.add(batchDiaries[index].id);
        }
      });
      
      // 根據文檔是否存在，使用 set 或 update
      const batch = writeBatch(db);
      
      batchDiaries.forEach((diary) => {
        const diaryRef = doc(db, 'diaries', diary.id);
        // 獲取本地日記的最後修改時間戳
        const lastModifiedTimestamp = getLocalDiaryTimestamp(diary);
        
        const diaryData = {
          id: diary.id,
          userId: userId,
          title: diary.title || '',
          content: diary.content || '',
          date: diary.date || '',
          lastModifiedTimestamp: lastModifiedTimestamp,
          latitude: diary.latitude || null,
          longitude: diary.longitude || null,
        };

        if (existingDocs.has(diary.id)) {
          // 文檔存在，更新資料，保留原有的 createdAt
          batch.update(diaryRef, diaryData);
        } else {
          // 文檔不存在，設置 createdAt
          batch.set(diaryRef, {
            ...diaryData,
            createdAt: serverTimestamp(),
          });
        }
        
        syncedCount++;
      });

      // 提交當前批次
      await batch.commit();
    }

    return { 
      success: true, 
      error: null, 
      syncedCount: syncedCount 
    };
  } catch (error) {
    console.error('同步日記到 Firestore 失敗:', error);
    return { 
      success: false, 
      error: error.message || '同步失敗', 
      syncedCount: 0 
    };
  }
};

/**
 * 從 Firestore 獲取用戶的所有日記（為未來下載功能預留）
 * @param {string} userId - 用戶 ID
 * @returns {Promise<{diaries: Array, error: string|null}>}
 */
export const getDiariesFromFirestore = async (userId) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }

    if (!userId) {
      throw new Error('用戶 ID 不能為空');
    }

    // 查詢該用戶的所有日記
    const diariesRef = collection(db, 'diaries');
    const q = query(diariesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const diaries = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      diaries.push({
        id: data.id || doc.id,
        title: data.title || '',
        content: data.content || '',
        date: data.date || '',
        lastModifiedTimestamp: data.lastModifiedTimestamp || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      });
    });

    return { diaries, error: null };
  } catch (error) {
    console.error('從 Firestore 獲取日記失敗:', error);
    return { diaries: [], error: error.message || '獲取失敗' };
  }
};

