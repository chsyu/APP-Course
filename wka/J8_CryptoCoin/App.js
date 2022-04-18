import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';

import Navigation from "./src/navigations"
import { customTheme } from './src/Theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;