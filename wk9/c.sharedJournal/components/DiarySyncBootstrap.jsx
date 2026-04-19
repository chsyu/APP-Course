import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';
import {
  fetchDiariesFromFirestore,
  DIARY_LAST_CLOUD_SYNC_AT_KEY,
} from '../services/diarySyncService';
import {
  fetchSharedJournalsForUser,
  fetchSharedDiaries,
} from '../services/sharedJournalService';
import { normalizeAuthEmail } from '../services/userService';

/**
 * 已登入時向 Firestore 拉取私人日記、分享日誌與其日記，並合併進本地 store。
 */
export default function DiarySyncBootstrap() {
  const uid = useUserStore((s) => s.user?.uid);
  const userEmailKey = useUserStore((s) => normalizeAuthEmail(s.user?.email));

  useEffect(() => {
    if (!uid) return undefined;

    let cancelled = false;
    (async () => {
      const priv = await fetchDiariesFromFirestore(uid);
      if (cancelled || !priv.success) return;

      const sharedRes = userEmailKey
        ? await fetchSharedJournalsForUser(userEmailKey)
        : { success: false, error: 'no email' };
      const sharedClusters = [];
      if (!cancelled && sharedRes.success) {
        for (const j of sharedRes.journals) {
          const dr = await fetchSharedDiaries(j.id);
          if (cancelled) return;
          sharedClusters.push({
            id: j.id,
            name: j.name,
            ownerUid: j.ownerUid,
            memberEmails: j.memberEmails,
            diaries: dr.success ? dr.diaries : [],
          });
        }
      }

      if (cancelled) return;
      useDiaryStore.getState().mergeRemoteSync({
        privateDiaries: priv.diaries,
        sharedClusters: sharedRes.success ? sharedClusters : null,
      });
      await AsyncStorage.setItem(DIARY_LAST_CLOUD_SYNC_AT_KEY, new Date().toISOString());
    })();

    return () => {
      cancelled = true;
    };
  }, [uid, userEmailKey]);

  return null;
}
