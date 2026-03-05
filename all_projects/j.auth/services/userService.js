import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCurrentUser } from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@user_profile';

/**
 * 在 Firestore 创建用户文档
 * @param {string} userId - 用户 ID
 * @param {object} userData - 用户数据
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const createUserProfile = async (userId, userData) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }
    
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      email: userData.email || '',
      displayName: userData.displayName || '',
      avatar: userData.avatar || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // 同时保存到本地
    await saveUserToLocal(userId, {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    return { success: true, error: null };
  } catch (error) {
    console.error('创建用户文档失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 从 Firestore 获取用户数据
 * @param {string} userId - 用户 ID
 * @returns {Promise<{user: object|null, error: string|null}>}
 */
export const getUserProfile = async (userId) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }
    
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // 转换 Timestamp 为 ISO 字符串
      const user = {
        ...userData,
        createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
        updatedAt: userData.updatedAt?.toDate?.()?.toISOString() || userData.updatedAt,
      };
      
      // 同步到本地
      await saveUserToLocal(userId, user);
      
      return { user, error: null };
    } else {
      return { user: null, error: '用户数据不存在' };
    }
  } catch (error) {
    console.error('获取用户数据失败:', error);
    return { user: null, error: error.message };
  }
};

/**
 * 更新用户数据（包括头像 base64）
 * @param {string} userId - 用户 ID
 * @param {object} updates - 要更新的字段
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }
    
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // 文档存在，更新它
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } else {
      // 文档不存在，创建它
      const currentUser = getCurrentUser();
      
      await setDoc(userRef, {
        email: currentUser?.email || '',
        displayName: currentUser?.email?.split('@')[0] || '用户',
        avatar: updates.avatar || null,
        ...updates,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    // 同时更新本地数据
    const localUser = await getUserFromLocal(userId);
    if (localUser) {
      await saveUserToLocal(userId, {
        ...localUser,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // 如果本地也没有数据，创建基本数据
      const currentUser = getCurrentUser();
      await saveUserToLocal(userId, {
        email: currentUser?.email || '',
        displayName: currentUser?.email?.split('@')[0] || '用户',
        avatar: updates.avatar || null,
        ...updates,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('更新用户数据失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 从本地存储获取用户数据
 * @param {string} userId - 用户 ID
 * @returns {Promise<object|null>}
 */
export const getUserFromLocal = async (userId) => {
  try {
    const data = await AsyncStorage.getItem(`${USER_STORAGE_KEY}_${userId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('从本地获取用户数据失败:', error);
    return null;
  }
};

/**
 * 保存用户数据到本地存储
 * @param {string} userId - 用户 ID
 * @param {object} userData - 用户数据
 * @returns {Promise<void>}
 */
export const saveUserToLocal = async (userId, userData) => {
  try {
    await AsyncStorage.setItem(
      `${USER_STORAGE_KEY}_${userId}`,
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error('保存用户数据到本地失败:', error);
  }
};

/**
 * 同步 Firestore 数据到本地
 * @param {string} userId - 用户 ID
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const syncUserToLocal = async (userId) => {
  return await getUserProfile(userId);
};

/**
 * 同步本地数据到 Firestore
 * @param {string} userId - 用户 ID
 * @param {object} userData - 用户数据
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const syncUserToFirestore = async (userId, userData) => {
  try {
    if (!db) {
      throw new Error('Firestore 未初始化');
    }
    
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // 更新现有文档
      return await updateUserProfile(userId, userData);
    } else {
      // 创建新文档
      return await createUserProfile(userId, userData);
    }
  } catch (error) {
    console.error('同步用户数据到 Firestore 失败:', error);
    return { success: false, error: error.message };
  }
};

