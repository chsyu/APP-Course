import React from 'react';
import { ScrollView, View } from 'react-native';

import SpinnerBtn from './components/SpinnerBtn';

const App = () => (
  <SpinnerBtn 
    title='Sign In'
    backgroundColor='#4AAF4C'
    onPress={()=>console.log('Pressed!!')}
  />
);

export default App;
