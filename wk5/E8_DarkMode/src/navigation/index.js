import React from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'native-base';
import { extendTheme, useColorMode } from 'native-base';

import AlbumScreen from '../screens/AlbumScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DisplaySettingScreen from '../screens/DisplaySettingScreen';
import { lightTheme, darkTheme } from '../Theme';

import albumData from "../json/albums.json";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// // Define the config
// const config = {
//   useSystemColorMode: false,
//   initialColorMode: "light",
// };

// // extend the theme
// export const theme = extendTheme({ config });

const Navigation = () => {
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == 'light' ? lightTheme : darkTheme;
  return (
    <NavigationContainer theme={MyTheme} >
      <StatusBar
        barStyle={
          colorMode == "light" ? "dark-content" : "light-content"
        }
        backgroundColor={
          colorMode == "light" ? "white" : "black"
        }
      />
      <MyTabs />
    </NavigationContainer>
  );
}

const MyTabs = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarInactiveTintColor: colors.light400,
        tabBarActiveTintColor: colors.primary700,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false,
          title: "Settings",
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const SettingsStack = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
        }}
      />
      <Stack.Screen
        name="DisplaySetting"
        component={DisplaySettingScreen}
        options={{
          title: "Display",
          headerTintColor: colorMode == 'light' ? 'black' : 'white',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
        }}
      />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false
    // }}
    >
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
          headerTintColor: colorMode == 'light' ? 'black' : 'white',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default Navigation;