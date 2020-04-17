import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

import AlbumScreen from './src/screens/AlbumScreen';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MeScreen from './src/screens/MeScreen';
import albumData from "./src/json/albums.json";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AlbumStack = () => {
  return (
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
              backgroundColor: '#4F9DEB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 20
            },  
           })}
        />      
      </Stack.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconPath;

            if (route.name === 'Album') {
              iconPath = focused
              ? require('./assets/icon_bottomnav_home_seleced.png'):
              require('./assets/icon_bottomnav_home.png');
            } else if (route.name === 'Settings') {
              iconPath = focused
              ? require('./assets/icon_bottomnav_mybook_selected.png'):
              require('./assets/icon_bottomnav_mybook.png');
            } else if (route.name == 'Me') {
              iconPath = focused
              ? require('./assets/icon_bottomnav_favorites_seleced.png'):
              require('./assets/icon_bottomnav_favorites.png');
            }

            // You can return any component that you like here!
            return (
              <Image 
                style={{width: 30, height: 30}}
                source={iconPath} 
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#01B49F',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 12,
            marginTop: 0,
            padding: 0,
          },
        }}
      >
        <Tab.Screen name="Album" component={AlbumStack} />
        <Tab.Screen name="Me" component={MeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;