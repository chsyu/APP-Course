import React from 'react';
import { Platform } from 'react-native';

import MainDrawerNavigator from './src/navigations/MainDrawerNavigator';
import MainTabNavigator from './src/navigations/MainTabNavigator';

const App = () => {
  return Platform.OS === 'ios'?
  <MainTabNavigator />:
  <MainDrawerNavigator />;
}

export default App;