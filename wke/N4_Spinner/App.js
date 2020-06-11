import React from "react";
import * as firebase from "firebase";
import LoginScreen from "./src/screens/LoginScreen";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUH6vOCALEXSjYHgv8P9d2y3tKklE44qA",
  authDomain: "f2e2020-bd468.firebaseapp.com",
  databaseURL: "https://f2e2020-bd468.firebaseio.com",
  projectId: "f2e2020-bd468",
  storageBucket: "f2e2020-bd468.appspot.com",
  messagingSenderId: "832044128799",
  appId: "1:832044128799:web:5dedad46efcd2c3253932a",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return <LoginScreen />;
};

export default App;
