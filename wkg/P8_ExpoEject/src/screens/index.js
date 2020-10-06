import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Image } from "react-native";

import AlbumScreen from "./AlbumScreen";
import DetailScreen from "./DetailScreen";
import SettingsScreen from "./SettingsScreen";
import MeScreen from "./MeScreen";
import albumData from "../json/albums.json";

export const Stack = createStackNavigator();

export const AlbumStackTab = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AlbumScreen}
        options={{
          title: albumData.albumTitle,
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: "#4F9DEB",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export const AlbumStackDrawer = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AlbumScreen}
        options={{
          title: albumData.albumTitle,
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <Ionicons
                name={"ios-menu"}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: "#4F9DEB",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export const MeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Me"
        component={MeScreen}
        options={{
          title: "Me",
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <Ionicons
                name={"ios-menu"}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerTitleStyle: {
            fontWeight: "400",
            fontSize: 20,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <Ionicons
                name={"ios-menu"}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

