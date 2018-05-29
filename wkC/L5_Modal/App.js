import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LoginStack } from './src/Router';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBPfEL_xpVQoU9CydiJbT73TzJOVkNoLJY",
      authDomain: "app2018-92631.firebaseapp.com",
      databaseURL: "https://app2018-92631.firebaseio.com",
      projectId: "app2018-92631",
      storageBucket: "app2018-92631.appspot.com",
      messagingSenderId: "57614490185"
    });
  }

  render() {
    return (
      <LoginStack />
    );
  }
}

export default App;
