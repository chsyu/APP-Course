import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AlbumScreen from './src/screens/AlbumScreen';
import DetailScreen from './src/screens/DetailScreen';
import albumData from "./src/json/albums.json";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer SafeArea>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={AlbumScreen}
            options={{
              title: albumData.albumTitle,
              headerTitleStyle: {
                fontWeight: '400',
                fontSize: 20
              },
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({ route }) => ({
              title: route.params.title,
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: '400',
                fontSize: 20
              },
            })}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>

  );
}

export default App;