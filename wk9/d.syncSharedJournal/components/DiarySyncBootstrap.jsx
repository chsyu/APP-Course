import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '../store/useUserStore';
import useDiaryStore from '../store/useDiaryStore';
import { auth } from '../config/firebase';
import { pullRemoteDiariesAndMerge } from '../services/diaryCloudPullMerge';
import { normalizeAuthEmail } from '../services/userService';

export default function DiarySyncBootstrap() {
  const uid = useUserStore((s) => s.user?.uid);
  const userEmailKey = useUserStore((s) => normalizeAuthEmail(s.user?.email));
  /** 與 user store 還原時序脫鉤：Auth 尚未掛上 currentUser 時仍會在 onAuthStateChanged 後再跑一次 */
  const [authSession, setAuthSession] = useState(0);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, () => {
      setAuthSession((n) => n + 1);
    });
  }, []);

  useEffect(() => {
    if (!uid) return undefined;
    let cancelled = false;
    pullRemoteDiariesAndMerge({ cancelled: () => cancelled }).catch((e) => {
      if (__DEV__) console.warn('[DiarySyncBootstrap] sync error', e);
    });
    return () => {
      cancelled = true;
    };
  }, [uid, userEmailKey, authSession]);

  /** 日誌 store 從 AsyncStorage 還原完成後再拉一次雲端，避免與 persist merge 競態導致分享日誌被蓋掉 */
  useEffect(() => {
    const p = useDiaryStore.persist;
    if (!p?.onFinishHydration) return undefined;
    return p.onFinishHydration(() => {
      if (!useUserStore.getState().user?.uid) return;
      pullRemoteDiariesAndMerge({ cancelled: () => false }).catch((e) => {
        if (__DEV__) console.warn('[DiarySyncBootstrap] post-hydration sync error', e);
      });
    });
  }, []);

  return null;
}
