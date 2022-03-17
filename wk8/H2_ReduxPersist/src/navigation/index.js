import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'native-base';
import { NavigationContainer, useTheme, Header } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar, Divider, Image, Input, HStack, Box } from 'native-base';
import { useColorMode } from 'native-base';

import AlbumScreen from '../screens/AlbumScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DisplaySettingScreen from '../screens/DisplaySettingScreen';
import AccountSettingScreen from '../screens/AccountSettingScreen';
import NullScreen from '../screens/NullScreen';
import MyTheme from '../Theme';
import ActionButton from '../components/ActionButton';

import albumData from "../json/albums.json";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ios: 0, android: -500})}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
      <NavigationContainer theme={MyTheme} >
        <StatusBar
          barStyle={colorMode == "light" ? "dark-content" : "light-content"}
          backgroundColor={colorMode == "light" ? "white" : "black"}
        />
        {Platform.OS == 'ios' ?
          <MyTabs /> :
          <MyDrawer />
        }
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <Image
        h={250}
        source={require("../images/drawerTile.jpg")}
        alt='albumImage'
      />
      <DrawerItemList {...props} />
      <Divider my="2" />
      <DrawerItem
        label="Help"
        activeBackgroundColor={colorMode == "light" ? colors.primary100 : 'black'}
        activeTintColor={colorMode == "light" ? colors.primary700 : 'white'}
        inactiveTintColor={colorMode == "light" ? colors.light500 : 'gray'}
        labelStyle={{ fontSize: 18, fontWeight: '400' }}
        icon={({ color }) => (
          <MaterialCommunityIcons name="account-question" color={color} size={26} />
        )}
        onPress={() => alert('Need Help ...')}
      />
      <HStack pl="4" alignItems="center">
        <MaterialCommunityIcons name="magnify" color={colorMode == "light" ? colors.light500 : 'gray'} size={26} />
        <Input mx="3" fontSize={18} placeholder="Input Search Text" flex={1} />
      </HStack>

    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerActiveBackgroundColor: colorMode == "light" ? colors.primary100 : 'black',
        drawerActiveTintColor: colorMode == "light" ? colors.primary700 : 'white',
        drawerInactiveTintColor: colorMode == "light" ? colors.light500 : 'gray',
        drawerStyle: { width: 250, backgroundColor: colorMode == "light" ? "white" : "black" },
        drawerLabelStyle: { fontSize: 18, fontWeight: '400' },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false,
          drawerLabel: "Settings",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}


const MyTabs = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarInactiveTintColor: colorMode == 'light' ? colors.light500 : 'gray',
        tabBarActiveTintColor: colorMode == 'light' ? colors.primary700 : 'white',
        tabBarStyle: { backgroundColor: colorMode == 'light' ? 'white' : 'black' },
        // headerShown: false
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
        name="ActionButton"
        component={NullScreen}
        options={{
          tabBarButton: () => <ActionButton />
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

const SettingsStack = ({ navigation }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: colorMode == 'light' ? 'white' : 'black',
          },
          headerTitleStyle: {
            color: colorMode == 'light' ? 'black' : 'white',
            fontWeight: '400',
            fontSize: 20
          },
          headerLeft: () => (
            Platform.OS == 'ios' ?
              <></> :
              <MaterialCommunityIcons
                name={'menu'}
                color={colorMode == 'light' ? 'black' : 'white'}
                size={20}
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 20 }}
              />
          ),
        }}
      />
      <Stack.Screen
        name="DisplaySetting"
        component={DisplaySettingScreen}
        options={{
          title: "Display",
          headerStyle: {
            backgroundColor: colorMode == 'light' ? 'white' : 'black',
          },
          headerTintColor: colorMode == 'light' ? 'black' : 'white',
          headerTitleStyle: {
            color: colorMode == 'light' ? 'black' : 'white',
            fontWeight: '400',
            fontSize: 20
          },
        }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSettingScreen}
        options={{
          title: "Account",
          headerStyle: {
            backgroundColor: colorMode == 'light' ? 'white' : 'black',
          },
          headerTintColor: colorMode == 'light' ? 'black' : 'white',
          headerTitleStyle: {
            color: colorMode == 'light' ? 'black' : 'white',
            fontWeight: '400',
            fontSize: 20
          },
        }}
      />

    </Stack.Navigator>
  );
}

const HomeStack = ({ navigation }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={AlbumScreen}
        options={{
          title: albumData.albumTitle,
          headerStyle: {
            backgroundColor: colorMode == 'light' ? 'white' : 'black',
          },
          headerTitleStyle: {
            color: colorMode == 'light' ? 'black' : 'white',
            fontWeight: '400',
            fontSize: 20
          },
          headerLeft: () => (
            Platform.OS == 'ios' ?
              <></> :
              <MaterialCommunityIcons
                name={'menu'}
                color={colorMode == 'light' ? 'black' : 'white'}
                size={20}
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 20 }}
              />
          ),
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
          headerTintColor: colorMode == 'light' ? 'black' : 'white',
          headerStyle: {
            backgroundColor: colorMode == 'light' ? 'white' : 'black',
          },
          headerTitleStyle: {
            color: colorMode == 'light' ? 'black' : 'white',
            fontWeight: '400',
            fontSize: 20
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default Navigation;