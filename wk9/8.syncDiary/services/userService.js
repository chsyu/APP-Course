import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';

/**
 * @param {string} uid
 * @returns {Promise<{ email?: string, userName?: string, avatar?: string | null } | null>}
 */
export async function getUserProfile(uid) {
  if (!db || !uid) return null;
  try {
    const ref = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data();
  } catch (_e) {
    return null;
  }
}

/**
 * @param {string} uid
 * @param {{ email: string, userName: string, avatar?: string | null }} userData
 */
export async function createUserProfile(uid, userData) {
  if (!db || !uid) {
    return { success: false, error: '無法連線至資料庫' };
  }
  try {
    await setDoc(
      doc(db, USERS_COLLECTION, uid),
      {
        email: userData.email,
        userName: userData.userName,
        avatar: userData.avatar ?? null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return {
        success: false,
        error: '資料庫權限不足：請確認 Firestore rules 已部署，且目前登入帳號可寫入 users/{uid}',
      };
    }
    return {
      success: false,
      error: e?.message || '建立用戶資料失敗',
    };
  }
}

/**
 * @param {string} uid
 * @param {{ userName: string, avatar?: string | null }} profileData
 */
export async function updateUserProfile(uid, profileData) {
  if (!db || !uid) {
    return { success: false, error: '無法連線至資料庫' };
  }
  try {
    await setDoc(
      doc(db, USERS_COLLECTION, uid),
      {
        userName: profileData.userName.trim(),
        avatar: profileData.avatar ?? null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (e) {
    if (e?.code === 'permission-denied' || e?.code === 'firestore/permission-denied') {
      return {
        success: false,
        error: '資料庫權限不足：請確認 Firestore rules 已部署，且目前登入帳號可寫入 users/{uid}',
      };
    }
    return {
      success: false,
      error: e?.message || '更新用戶資料失敗',
    };
  }
}
