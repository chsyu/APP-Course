import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { Provider } from "react-redux";
import { store } from './src/redux/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistor } from './src/redux/store';

import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;