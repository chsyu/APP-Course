import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image } from "react-native";

import { AlbumStackTab } from "../screens";
import MeScreen from "../screens/MeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconPath;

                if (route.name === 'Album') {
                    iconPath = focused
                    ? require('../../assets/icon_bottomnav_home_seleced.png'):
                    require('../../assets/icon_bottomnav_home.png');
                } else if (route.name === 'Settings') {
                    iconPath = focused
                    ? require('../../assets/icon_bottomnav_mybook_selected.png'):
                    require('../../assets/icon_bottomnav_mybook.png');
                } else if (route.name == 'Me') {
                    iconPath = focused
                    ? require('../../assets/icon_bottomnav_favorites_seleced.png'):
                    require('../../assets/icon_bottomnav_favorites.png');
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
            <Tab.Screen name="Album" component={AlbumStackTab} />
            <Tab.Screen name="Me" component={MeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainTabNavigator;