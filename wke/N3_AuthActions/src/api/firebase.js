import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:9eab06c1a773a9bcc81a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//REFERENCE AUTH
const auth = getAuth(app);

export const signInWithEmailPassword = async (email, password) => {
  return await signInWithEmailAndPassword(email, password);
}

export const registerWithEmailPassword = async (email, password, name) => {
  await createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({
    displayName: name,
  })
  return user;
}

export const signOut = () => {
  // auth.signOut();
}
