import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';

import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;