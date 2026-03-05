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
import { parseDiaryDateToISO } from '../utils/dateFormatter';

/**
 * 獲取本地日記的最後修改時間戳（ISO 8601）
 * @param {Object} diary - 本地日記對象
 * @returns {string} ISO 8601 時間戳
 */
const getLocalDiaryTimestamp = (diary) => {
  // 優先使用 lastModifiedTimestamp
  if (diary.lastModifiedTimestamp) {
    return diary.lastModifiedTimestamp;
  }
  
  // 其次使用 date 轉換（向後兼容舊資料）
  if (diary.date) {
    const timestamp = parseDiaryDateToISO(diary.date);
    if (timestamp) return timestamp;
  }
  
  // 如果都沒有，返回當前時間
  return new Date().toISOString();
};

/**
 * 獲取 Firestore 日記的最後修改時間戳（ISO 8601）
 * @param {Object} firestoreDiary - Firestore 日記對象
 * @returns {string|null} ISO 8601 時間戳，如果不存在返回 null
 */
const getFirestoreDiaryTimestamp = (firestoreDiary) => {
  if (!firestoreDiary) return null;
  
  // 優先使用 lastModifiedTimestamp
  if (firestoreDiary.lastModifiedTimestamp) {
    return firestoreDiary.lastModifiedTimestamp;
  }
  
  // 如果沒有，返回 null（視為需要更新，向後兼容舊資料）
  return null;
};

/**
 * 判斷是否需要更新日記
 * @param {Object} localDiary - 本地日記對象
 * @param {Object} firestoreDiary - Firestore 日記對象（可能為 null）
 * @returns {boolean} 是否需要更新
 */
const shouldUpdateDiary = (localDiary, firestoreDiary) => {
  // 如果 Firestore 中不存在，需要同步
  if (!firestoreDiary) return true;
  
  // 獲取時間戳
  const localTimestamp = getLocalDiaryTimestamp(localDiary);
  const firestoreTimestamp = getFirestoreDiaryTimestamp(firestoreDiary);
  
  // 如果 Firestore 沒有時間戳，視為需要更新（向後兼容）
  if (!firestoreTimestamp) return true;
  
  // 比較時間戳
  const localTime = new Date(localTimestamp).getTime();
  const firestoreTime = new Date(firestoreTimestamp).getTime();
  
  return localTime > firestoreTime;
};

/**
 * 將日記同步到 Firestore（智能同步：只更新比雲端新的日記）
 * @param {string} userId - 用戶 ID
 * @param {Array} diaries - 日記陣列
 * @returns {Promise<{success: boolean, error: string|null, syncedCount: number, updatedCount: number, skippedCount: number, totalCount: number}>}
 */
export const syncDiariesToFirestore = async (userId, diaries) => {
  try {
    // 確保 db 是有效的 Firestore 實例
    if (!db || typeof db === 'undefined' || db === null) {
      throw new Error('Firestore 未初始化，請檢查 Firebase 配置');
    }

    if (!userId) {
      throw new Error('用戶 ID 不能為空');
    }

    if (!Array.isArray(diaries)) {
      throw new Error('日記資料必須是陣列');
    }

    // 使用 batch 進行批量寫入（最多 500 個操作）
    let syncedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // 分批處理（每批最多 500 個）
    const batchSize = 500;
    for (let i = 0; i < diaries.length; i += batchSize) {
      const batchDiaries = diaries.slice(i, i + batchSize);
      
      // 先批量查詢所有文檔是否存在及其數據
      const diaryRefs = batchDiaries.map(diary => doc(db, 'diaries', diary.id));
      const diarySnaps = await Promise.all(diaryRefs.map(ref => getDoc(ref)));
      
      // 建立文檔數據映射
      const firestoreDiariesMap = new Map();
      diarySnaps.forEach((snap, index) => {
        if (snap.exists()) {
          firestoreDiariesMap.set(batchDiaries[index].id, snap.data());
        }
      });
      
      // 根據比較結果決定是否更新
      const batch = writeBatch(db);
      
      batchDiaries.forEach((diary) => {
        const firestoreDiary = firestoreDiariesMap.get(diary.id);
        
        // 判斷是否需要更新
        if (!shouldUpdateDiary(diary, firestoreDiary)) {
          skippedCount++;
          return; // 跳過此日記
        }
        
        const diaryRef = doc(db, 'diaries', diary.id);
        const localTimestamp = getLocalDiaryTimestamp(diary);
        const diaryData = {
          id: diary.id,
          userId: userId,
          title: diary.title || '',
          content: diary.content || '',
          date: diary.date || '',
          lastModifiedTimestamp: localTimestamp,
          latitude: diary.latitude || null,
          longitude: diary.longitude || null,
        };

        if (firestoreDiary) {
          // 文檔存在，更新資料，保留原有的 createdAt
          batch.update(diaryRef, diaryData);
          updatedCount++;
        } else {
          // 文檔不存在，設置 createdAt
          batch.set(diaryRef, {
            ...diaryData,
            createdAt: serverTimestamp(),
          });
          syncedCount++;
        }
      });

      // 提交當前批次
      await batch.commit();
    }

    return { 
      success: true, 
      error: null, 
      syncedCount: syncedCount, // 新建數量
      updatedCount: updatedCount, // 更新數量
      skippedCount: skippedCount, // 跳過數量
      totalCount: syncedCount + updatedCount + skippedCount, // 總數
    };
  } catch (error) {
    console.error('同步日記到 Firestore 失敗:', error);
    return { 
      success: false, 
      error: error.message || '同步失敗', 
      syncedCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      totalCount: 0,
    };
  }
};

/**
 * 雙向同步日記（下載雲端資料並合併到本地，然後上傳本地更新的資料）
 * @param {string} userId - 用戶 ID
 * @param {Array} localDiaries - 本地日記陣列
 * @returns {Promise<{success: boolean, error: string|null, syncedCount: number, updatedCount: number, skippedCount: number, downloadedCount: number, totalCount: number}>}
 */
export const syncDiariesBidirectional = async (userId, localDiaries) => {
  try {
    // 確保 db 是有效的 Firestore 實例
    if (!db || typeof db === 'undefined' || db === null) {
      throw new Error('Firestore 未初始化，請檢查 Firebase 配置');
    }

    if (!userId) {
      throw new Error('用戶 ID 不能為空');
    }

    if (!Array.isArray(localDiaries)) {
      throw new Error('日記資料必須是陣列');
    }

    // 第一步：從雲端下載所有日記
    const cloudResult = await getDiariesFromFirestore(userId);
    if (cloudResult.error) {
      throw new Error(`下載雲端資料失敗: ${cloudResult.error}`);
    }
    const cloudDiaries = cloudResult.diaries || [];
    let downloadedCount = 0;

    // 第二步：合併雲端資料到本地（保留較新的版本）
    const localDiariesMap = new Map();
    localDiaries.forEach(diary => {
      localDiariesMap.set(diary.id, diary);
    });

    const mergedDiaries = [...localDiaries];
    cloudDiaries.forEach(cloudDiary => {
      const localDiary = localDiariesMap.get(cloudDiary.id);
      
      if (!localDiary) {
        // 雲端有但本地沒有，添加到本地
        mergedDiaries.push(cloudDiary);
        downloadedCount++;
      } else {
        // 兩邊都有，比較時間戳，保留較新的版本
        const localTimestamp = getLocalDiaryTimestamp(localDiary);
        const cloudTimestamp = getFirestoreDiaryTimestamp(cloudDiary);
        
        if (cloudTimestamp && new Date(cloudTimestamp).getTime() > new Date(localTimestamp).getTime()) {
          // 雲端版本更新，替換本地版本
          const index = mergedDiaries.findIndex(d => d.id === cloudDiary.id);
          if (index !== -1) {
            mergedDiaries[index] = cloudDiary;
            downloadedCount++;
          }
        }
      }
    });

    // 第三步：上傳本地更新的資料到雲端
    const uploadResult = await syncDiariesToFirestore(userId, mergedDiaries);

    return {
      success: uploadResult.success,
      error: uploadResult.error,
      syncedCount: uploadResult.syncedCount,
      updatedCount: uploadResult.updatedCount,
      skippedCount: uploadResult.skippedCount,
      downloadedCount: downloadedCount,
      totalCount: uploadResult.totalCount,
      mergedDiaries: mergedDiaries, // 返回合併後的日記陣列
    };
  } catch (error) {
    console.error('雙向同步失敗:', error);
    return {
      success: false,
      error: error.message || '同步失敗',
      syncedCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      downloadedCount: 0,
      totalCount: 0,
      mergedDiaries: localDiaries, // 失敗時返回原始本地資料
    };
  }
};

/**
 * 從 Firestore 獲取用戶的所有日記
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

    // 確保 db 是有效的 Firestore 實例
    if (typeof db === 'undefined' || db === null) {
      throw new Error('Firestore 未正確初始化');
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

