import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * 注册新用户
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @returns {Promise<{user: object, error: null}> | {user: null, error: string}}
 */
export const signUp = async (email, password) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth 未初始化');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('注册失败:', error);
    let errorMessage = '注册失败，请重试';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = '该邮箱已被使用';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = '邮箱格式不正确';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = '密码强度不够（至少6个字符）';
    }
    
    return { user: null, error: errorMessage };
  }
};

/**
 * 登录
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @returns {Promise<{user: object, error: null}> | {user: null, error: string}}
 */
export const signIn = async (email, password) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth 未初始化');
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('登录失败:', error);
    let errorMessage = '登录失败，请重试';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = '用户不存在';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = '密码错误';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = '邮箱格式不正确';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = '账户已被禁用';
    }
    
    return { user: null, error: errorMessage };
  }
};

/**
 * 登出
 * @returns {Promise<{error: null}> | {error: string}}
 */
export const signOut = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth 未初始化');
    }
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    console.error('登出失败:', error);
    return { error: '登出失败，请重试' };
  }
};

/**
 * 获取当前用户
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
};

/**
 * 监听认证状态变化
 * @param {function} callback - 状态变化回调函数
 * @returns {function} 取消监听的函数
 */
export const onAuthStateChanged = (callback) => {
  if (!auth) {
    console.warn('Firebase Auth 未初始化，无法监听状态变化');
    return () => {};
  }
  return firebaseOnAuthStateChanged(auth, callback);
};

