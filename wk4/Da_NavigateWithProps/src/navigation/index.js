import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlbumScreen from '../screens/AlbumScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AlbumScreen}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

export default Navigation;