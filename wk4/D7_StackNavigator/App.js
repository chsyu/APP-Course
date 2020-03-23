import React from 'react';
// import { View, FlatList } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AlbumScreen from './src/screens/AlbumScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;