import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
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

export const login = async ({email, password}) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
}

export const register = async ({name, email, password}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
    return user;
  } catch (e) {
    console.log('error ...')
    console.log(e)
  }

}

export const logout = () => {
  signOut(auth);
}
