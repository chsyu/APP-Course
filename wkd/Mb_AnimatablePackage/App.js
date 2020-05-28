import React from "react";
import SpinnerBtn from './components/SpinnerBtn';
import * as Animatable from 'react-native-animatable';

const App = () => (
  <Animatable.View
    style={{flex: 1}}
    animation="pulse" easing="ease-out" iterationCount="infinite"
  >
    <SpinnerBtn 
      title='Sign In'
      backgroundColor='#4AAF4C'
      onPress={()=>console.log('Pressed!!')}
    />  
  </Animatable.View>

);

export default App;
