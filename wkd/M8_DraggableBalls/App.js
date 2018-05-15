import React from 'react';
import { View } from 'react-native';

import Ball from './components/Ball';

const App = () => (
  <View>
    <Ball positionXY={{ x: 0, y: 0 }} />
    <Ball positionXY={{ x: 300, y: 300 }} />
    <Ball positionXY={{ x: 200, y: 200 }} />
  </View>
);

export default App;
