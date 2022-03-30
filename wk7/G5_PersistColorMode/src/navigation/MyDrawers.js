import React from 'react';
import { useTheme } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider, Image, Input, HStack } from 'native-base';
import { useColorMode } from 'native-base';


import { HomeStack, SettingsStack } from './MyStacks';

const Drawer = createDrawerNavigator();

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

export const MyDrawer = () => {
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
