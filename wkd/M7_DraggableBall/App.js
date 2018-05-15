import React from 'react';
import { View } from 'react-native';

import Ball from './components/Ball';

const App = () => (
  <View>
    <Ball positionXY={{ x: 0, y: 0 }} />
  </View>
);

export default App;
