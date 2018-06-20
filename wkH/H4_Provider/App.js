import React, { Component } from 'react';
import Counter from './src/components/Counter';
import counterStore from './src/stores/counterStore';
import { Provider } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <Provider store={counterStore}>
        <Counter />
      </Provider>

    );
  }
}

export default App;
