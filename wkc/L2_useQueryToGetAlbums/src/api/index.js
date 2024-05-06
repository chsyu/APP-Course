import { getApps, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  initializeFirestore,
} from "firebase/firestore";


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

// REFERENCE Albums Collection
const albumsRef = collection(db, "albums");

export const getAlbums = async () => {
  const albumSnapshot = await getDocs(albumsRef);
  const albumList = albumSnapshot.docs.map(doc => doc.data());
  return albumList;
}


