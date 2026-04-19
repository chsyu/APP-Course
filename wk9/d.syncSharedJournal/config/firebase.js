import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Firebase 配置
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.firebaseAppId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// 验证配置
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('Firebase 配置不完整，请检查环境变量或 app.json 配置');
}

// 初始化 Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase 初始化失败:', error);
}

// 初始化 Auth 并配置 AsyncStorage 持久化
let auth = null;
if (app) {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // 如果 auth 已经初始化，使用 getAuth
    if (error.code === 'auth/already-initialized') {
      auth = getAuth(app);
    } else {
      console.error('Firebase Auth 初始化失败:', error);
    }
  }
}

// 导出服务
export { auth };
export const db = app ? getFirestore(app) : null;
export default app;

/**
 * Firestore security rules 使用 request.auth（含 token.email）。
 * React Native persistence 還原期間，getDocs 若早於 Auth 就緒會變成匿名請求 → permission-denied。
 */
export async function ensureAuthReady() {
  if (auth && typeof auth.authStateReady === 'function') {
    await auth.authStateReady();
  }
}

