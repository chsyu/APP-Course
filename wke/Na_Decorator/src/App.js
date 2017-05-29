import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import LibraryList from './components/LibraryList';

const App = () => (
  <Provider store={createStore(reducers)}>
    <LibraryList />
  </Provider>
);

export default App;
