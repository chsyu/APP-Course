import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LoginStack } from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA139Gz_OWXVDN2L71AZx48CK1c015glVw",
      authDomain: "fireauthapp-6682a.firebaseapp.com",
      databaseURL: "https://fireauthapp-6682a.firebaseio.com",
      projectId: "fireauthapp-6682a",
      storageBucket: "fireauthapp-6682a.appspot.com",
      messagingSenderId: "619517647764"
    });
  }

  render() {
    return (
      <LoginStack />
    );
  }
}


export default App;
