import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import {   
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } 
  from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Image } from 'react-native';
import { Tile } from 'react-native-elements';


import AlbumScreen from './src/screens/AlbumScreen';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MeScreen from './src/screens/MeScreen';
import albumData from "./src/json/albums.json";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const CustomDrawerAnimatedContent = ({ progress, ...rest }) => {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...rest} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const CustomDrawerContent = ({ ...rest }) => {
  return (
    <DrawerContentScrollView {...rest}>
      <Tile
        imageSrc={require('./assets/drawerTile.jpg')}
        featured
      />
      <DrawerItemList {...rest} />
    </DrawerContentScrollView>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerStyle={{ width: 320,}}
        drawerContentOptions={{
          activeBackgroundColor: '#00b49f',
          activeTintColor:'#fff',
          itemStyle: { marginLeft: 0, marginRight: 0 },
          labelStyle: { fontSize: 20 },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="Album" 
          component={AlbumStack} 
          options={
            {
              drawerLabel: 'Home',
              drawerIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon_bottomnav_home.png')}
                  style={{width:24, height: 24, tintColor: tintColor }}
                />
              ),            
            }
          }
          />
        <Drawer.Screen 
          name="Me" 
          component={MeScreen} 
          options={
            {
              drawerLabel: 'Me',
              drawerIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon_bottomnav_mybook.png')}
                  style={{width:24, height: 24, tintColor: tintColor }}
                />
              ),            
            }
          }
        />    
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={
            {
              drawerLabel: 'Settings',
              drawerIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon_bottomnav_favorites.png')}
                  style={{width:24, height: 24, tintColor: tintColor }}
                />
              ),            
            }
          }
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;