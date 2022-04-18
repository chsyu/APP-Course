import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, StatusBar, useColorMode } from "native-base"
import { Platform } from 'react-native';
import { darkTheme, lightTheme } from "../Theme"
import HomeScreen from '../screens/HomeScreen';
import CoinDetailedScreen from '../screens/CoinDetailedScreen';
import ActionButton from '../components/ActionButton';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
      <StatusBar
        barStyle={colorMode==="dark" ? "light-content" : "dark-content"}
        backgroundColor={colorMode==="dark" ? "black" : "white"}
      />
      <NavigationContainer theme={colorMode==="dark" ? darkTheme : lightTheme}>
        <StackNavigator />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const StackNavigator = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "CoinList",
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
          headerRight: () => (
            <ActionButton />
          ),
        }}
      />
      <Stack.Screen
        name="Detailed"
        component={CoinDetailedScreen}
        options={({ route }) => ({
          title: route.params.coinId,
          headerTintColor: colorMode === "dark" ? 'white' : 'gray',
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