import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from "react-redux";

import { NativeBaseProvider, extendTheme, KeyboardAvoidingView } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'native-base';
import { useColorMode } from 'native-base';

import MyTheme from '../Theme';
import { MyTabs } from './MyTabs';
import { MyDrawer } from './MyDrawers';
import LoginScreen from '../screens/LoginScreen';
import { selectHasLogin } from "../redux/accountSlice";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
const customTheme = extendTheme({ config });

const Navigation = () => {
  const { colorMode } = useColorMode();
  const hasLogin = useSelector(selectHasLogin);

  return (
    <NativeBaseProvider theme={customTheme}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        {
          !hasLogin
            ? (<LoginScreen />)
            : (
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
            )
        }

      </KeyboardAvoidingView>
    </NativeBaseProvider>

  );
}

export default Navigation;