import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Image } from "react-native";
import { Tile } from "react-native-elements";

import { AlbumStackDrawer, MeStack, SettingsStack } from "../screens";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ ...rest }) => {
  return (
    <DrawerContentScrollView style={{ marginTop: -48 }} {...rest}>
      <Tile imageSrc={require("../../assets/drawerTile.jpg")} featured />
      <DrawerItemList {...rest} />
    </DrawerContentScrollView>
  );
};

const MainDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ width: 320 }}
        drawerContentOptions={{
          activeBackgroundColor: "#00b49f",
          activeTintColor: "#fff",
          itemStyle: { marginLeft: 0, marginRight: 0 },
          labelStyle: { fontSize: 20 },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Album"
          component={AlbumStackDrawer}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/icon_bottomnav_home.png")}
                style={{ width: 24, height: 24, tintColor: tintColor }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Me"
          component={MeStack}
          options={{
            drawerLabel: "Me",
            drawerIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/icon_bottomnav_mybook.png")}
                style={{ width: 24, height: 24, tintColor: tintColor }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/icon_bottomnav_favorites.png")}
                style={{ width: 24, height: 24, tintColor: tintColor }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainDrawerNavigator;
