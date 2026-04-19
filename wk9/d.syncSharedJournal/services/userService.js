import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';
const PUBLIC_PROFILES_COLLECTION = 'publicProfiles';
const PUBLIC_PROFILES_BY_EMAIL_COLLECTION = 'publicProfilesByEmail';

/** @param {string | null | undefined} email */
export function normalizeAuthEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

/**
 * @param {string} uid
 * @param {{ userName?: string, avatar?: string | null }} slice
 */
async function upsertPublicProfile(uid, slice) {
  if (!db || !uid) return;
  await setDoc(
    doc(db, PUBLIC_PROFILES_COLLECTION, uid),
    {
      userName: slice.userName ?? '',
      avatar: slice.avatar ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * @param {string} emailKey normalizeAuthEmail 結果，作為文件 id
 * @param {{ userName?: string, avatar?: string | null, uid?: string }} slice
 */
async function upsertPublicProfileByEmailDoc(emailKey, slice) {
  if (!db || !emailKey) return;
  await setDoc(
    doc(db, PUBLIC_PROFILES_BY_EMAIL_COLLECTION, emailKey),
    {
      userName: slice.userName ?? '',
      avatar: slice.avatar ?? null,
      uid: slice.uid ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

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
 * 供協作者顯示用（不含 email）
 * @param {string} uid
 * @returns {Promise<{ userName?: string, avatar?: string | null } | null>}
 */
export async function getPublicProfile(uid) {
  if (!db || !uid) return null;
  try {
    const snap = await getDoc(doc(db, PUBLIC_PROFILES_COLLECTION, uid));
    if (!snap.exists()) return null;
    return snap.data();
  } catch (_e) {
    return null;
  }
}

/**
 * @param {string} email 任意大小寫 email
 * @returns {Promise<{ userName?: string, avatar?: string | null, uid?: string } | null>}
 */
export async function getPublicProfileByEmail(email) {
  const key = normalizeAuthEmail(email);
  if (!db || !key) return null;
  try {
    const snap = await getDoc(doc(db, PUBLIC_PROFILES_BY_EMAIL_COLLECTION, key));
    if (!snap.exists()) return null;
    return snap.data();
  } catch (_e) {
    return null;
  }
}

/**
 * 將 users/{uid} 的顯示欄位同步到 publicProfiles / publicProfilesByEmail
 * @param {string} uid
 * @param {{ userName?: string, avatar?: string | null, email?: string | null }} fields
 */
export async function syncPublicProfileFromUserFields(uid, fields) {
  if (!db || !uid || !fields) return;
  try {
    await upsertPublicProfile(uid, {
      userName: fields.userName ?? '',
      avatar: fields.avatar ?? null,
    });
    const emailKey = normalizeAuthEmail(fields.email);
    if (emailKey) {
      await upsertPublicProfileByEmailDoc(emailKey, {
        userName: fields.userName ?? '',
        avatar: fields.avatar ?? null,
        uid,
      });
    }
  } catch (_e) {
    /* ignore */
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
    await upsertPublicProfile(uid, {
      userName: userData.userName,
      avatar: userData.avatar ?? null,
    });
    const emailKey = normalizeAuthEmail(userData.email);
    if (emailKey) {
      await upsertPublicProfileByEmailDoc(emailKey, {
        userName: userData.userName,
        avatar: userData.avatar ?? null,
        uid,
      });
    }
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
    await upsertPublicProfile(uid, {
      userName: profileData.userName.trim(),
      avatar: profileData.avatar ?? null,
    });
    const row = await getUserProfile(uid);
    const emailKey = normalizeAuthEmail(row?.email);
    if (emailKey) {
      await upsertPublicProfileByEmailDoc(emailKey, {
        userName: profileData.userName.trim(),
        avatar: profileData.avatar ?? null,
        uid,
      });
    }
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
