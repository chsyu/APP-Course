import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-email': '郵箱格式不正確',
  'auth/user-disabled': '此帳號已被停用',
  'auth/user-not-found': '找不到此帳號',
  'auth/wrong-password': '密碼錯誤',
  'auth/invalid-credential': '郵箱或密碼不正確',
  'auth/email-already-in-use': '此郵箱已被註冊',
  'auth/weak-password': '密碼強度不足',
  'auth/network-request-failed': '網路連線失敗，請稍後再試',
  'auth/too-many-requests': '嘗試次數過多，請稍後再試',
};

function mapAuthError(code) {
  if (!code) return '發生錯誤，請稍後再試';
  return AUTH_ERROR_MESSAGES[code] || '登入失敗，請稍後再試';
}

export async function signIn(email, password) {
  if (!auth) {
    return { user: null, error: 'Firebase 尚未正確設定' };
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    return {
      user: { uid: cred.user.uid, email: cred.user.email ?? email.trim() },
      error: null,
    };
  } catch (e) {
    return { user: null, error: mapAuthError(e.code) };
  }
}

export async function signUp(email, password) {
  if (!auth) {
    return { user: null, error: 'Firebase 尚未正確設定' };
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    return {
      user: { uid: cred.user.uid, email: cred.user.email ?? email.trim() },
      error: null,
    };
  } catch (e) {
    return { user: null, error: mapAuthError(e.code) };
  }
}

export async function logout() {
  if (!auth) {
    return { user: null, error: 'Firebase 尚未正確設定' };
  }
  try {
    await signOut(auth);
    return { user: null, error: null };
  } catch (e) {
    return { user: null, error: mapAuthError(e.code) };
  }
}

