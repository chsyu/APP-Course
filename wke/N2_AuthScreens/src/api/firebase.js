import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29"
};

const app_length = getApps().length > 0;

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig);

//REFERENCE AUTH
const auth = app_length ? getAuth(app) :
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

export const login = async () => {}

export const register = async () => {}

export const logout = () => {}
