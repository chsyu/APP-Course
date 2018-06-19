import React, { Component } from 'react';
import Counter from './src/components/Counter';
import counterStore from './src/stores/counterStore';

class App extends Component {
  render() {
    return (
      <Counter counterStore = {counterStore} />
    );
  }
}

export default App;
