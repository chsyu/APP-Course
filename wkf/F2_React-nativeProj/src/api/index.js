import { getApps, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  initializeFirestore,
} from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
};

const app_length = getApps().length > 0;

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig);

// REFERENCE DB
const db = app_length
  ? getFirestore(app)
  : initializeFirestore(app, { experimentalForceLongPolling: true });

// REFERENCE AUTH
const auth = app_length
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

// REFERENCE Albums Collection
const albumsRef = collection(db, "albums");

export const getAlbums = async () => {
  const albumSnapshot = await getDocs(albumsRef);
  const albumList = albumSnapshot.docs.map(doc => doc.data());
  return albumList;
}

export const checkLogin = () => getAuth(app).currentUser;

export const login = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential?.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap?.data();
    return { uid: user?.uid, accessToken: user?.accessToken, email, ...userData };
};

export const register = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential?.user;
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, {
    name,
    email,
  });
  return {  uid: user?.uid, accessToken: user?.accessToken, name, email};
};

export const logout = async () => {
  await auth.signOut();
};

export const updateProfile = async (profile) => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, profile, { merge: true });
  const docSnap = await getDoc(docRef);
  const userData = docSnap?.data();
  return userData;
};
