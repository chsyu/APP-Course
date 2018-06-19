import React, { Component } from 'react';
import Counter from './src/components/Counter';
import {observable} from 'mobx';

class CounterStore {
   @observable count = 0;
}

let counterStore = new CounterStore();

class App extends Component {
  render() {
    return (
      <Counter counterStore = {counterStore} />
    );
  }
}

export default App;
