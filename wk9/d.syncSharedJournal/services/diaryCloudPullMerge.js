import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, ensureAuthReady } from '../config/firebase';
import { fetchDiariesFromFirestore, DIARY_LAST_CLOUD_SYNC_AT_KEY } from './diarySyncService';
import { fetchSharedJournalsForUser, fetchSharedDiaries } from './sharedJournalService';
import useDiaryStore from '../store/useDiaryStore';
import { useUserStore } from '../store/useUserStore';
import { normalizeAuthEmail } from './userService';

async function resolveEmailKeyForSharedQuery() {
  const firebaseUser = auth?.currentUser;
  let emailKey = normalizeAuthEmail(firebaseUser?.email);
  if (!emailKey && firebaseUser) {
    try {
      await firebaseUser.reload();
      emailKey = normalizeAuthEmail(firebaseUser.email);
    } catch {
      // ignore
    }
  }
  if (!emailKey) {
    emailKey = normalizeAuthEmail(useUserStore.getState().user?.email);
  }
  return emailKey;
}

/**
 * 從雲端拉取「私人日記」+「分享日誌與其日記」並 mergeRemoteSync，並更新上次同步時間。
 * 登入時 DiarySyncBootstrap 與備份頁「立即同步」應共用此邏輯，否則手動同步不會帶入他人在分享日誌的新增。
 *
 * @param {{ cancelled?: () => boolean }} [opts]
 * @returns {Promise<{ success: true, privateMerged: boolean, sharedMerged: boolean } | { success: false, error: string }>}
 */
export async function pullRemoteDiariesAndMerge(opts = {}) {
  const cancelled = typeof opts.cancelled === 'function' ? opts.cancelled : () => false;

  const firebaseUser = auth?.currentUser;
  const storeUid = useUserStore.getState().user?.uid;
  if (!firebaseUser?.uid || !storeUid || firebaseUser.uid !== storeUid) {
    return { success: false, error: '尚未登入' };
  }

  await ensureAuthReady();
  try {
    await firebaseUser.getIdToken(true);
  } catch {
    // ignore
  }

  const uid = firebaseUser.uid;
  const emailKey = await resolveEmailKeyForSharedQuery();
  if (cancelled()) return { success: false, error: '已取消' };

  const priv = await fetchDiariesFromFirestore(uid);
  if (cancelled()) return { success: false, error: '已取消' };

  const sharedRes = emailKey
    ? await fetchSharedJournalsForUser(emailKey)
    : { success: false, error: 'no email' };
  if (cancelled()) return { success: false, error: '已取消' };

  if (__DEV__) {
    if (!priv.success) {
      console.warn('[pullRemoteDiariesAndMerge] 私人日記拉取失敗（仍會嘗試合併分享）:', priv.error);
    }
    if (!sharedRes.success) {
      console.warn('[pullRemoteDiariesAndMerge] 分享日誌拉取失敗:', sharedRes.error);
    }
  }

  const sharedClusters = [];
  if (sharedRes.success) {
    for (const j of sharedRes.journals) {
      if (cancelled()) return { success: false, error: '已取消' };
      const dr = await fetchSharedDiaries(j.id);
      sharedClusters.push({
        id: j.id,
        name: j.name,
        ownerUid: j.ownerUid,
        memberEmails: j.memberEmails,
        diaries: dr.success ? dr.diaries : [],
      });
      if (__DEV__ && !dr.success) {
        console.warn('[pullRemoteDiariesAndMerge] 分享日誌內日記拉取失敗', j.id, dr.error);
      }
    }
  }

  if (cancelled()) return { success: false, error: '已取消' };

  useDiaryStore.getState().mergeRemoteSync({
    privateDiaries: priv.success ? priv.diaries : null,
    sharedClusters: sharedRes.success ? sharedClusters : null,
  });
  await AsyncStorage.setItem(DIARY_LAST_CLOUD_SYNC_AT_KEY, new Date().toISOString());

  return {
    success: true,
    privateMerged: priv.success,
    sharedMerged: sharedRes.success,
  };
}
