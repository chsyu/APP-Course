import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LoginStack } from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDOU3YmWlXPdeUXzkXgW1vgnkr5f5LljH0",
      authDomain: "project--8618119135927659799.firebaseapp.com",
      databaseURL: "https://project--8618119135927659799.firebaseio.com",
      projectId: "project--8618119135927659799",
      storageBucket: "project--8618119135927659799.appspot.com",
      messagingSenderId: "484256935889"
    });
  }

  render() {
    return (
      <LoginStack />
    );
  }
}


export default App;
