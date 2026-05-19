import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';
import {
  fetchDiariesFromFirestore,
  DIARY_LAST_CLOUD_SYNC_AT_KEY,
} from '../services/diarySyncService';

/**
 * 已登入時向 Firestore 拉取日記並合併進本地 store（最簡教學版：啟動／uid 變更時各跑一次）。
 */
export default function DiarySyncBootstrap() {
  const uid = useUserStore((s) => s.user?.uid);

  useEffect(() => {
    if (!uid) return undefined;

    let cancelled = false;
    (async () => {
      const res = await fetchDiariesFromFirestore(uid);
      if (cancelled || !res.success) return;
      useDiaryStore.getState().mergeRemoteDiaries(res.diaries);
      await AsyncStorage.setItem(DIARY_LAST_CLOUD_SYNC_AT_KEY, new Date().toISOString());
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  return null;
}
