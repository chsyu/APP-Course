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
import RegisterScreen from '../screens/RegisterScreen';
import { selectLogin } from "../redux/accountSlice";
import { selectColorMode } from '../redux/settingsSlice';

const Navigation = () => {
  const { colorMode } = useColorMode();
  const initialColorMode = useSelector(selectColorMode);
  const login = useSelector(selectLogin);
  console.log('login = ')
  console.log(login)

  // Define the config
  const config = {
    useSystemColorMode: false,
    initialColorMode,
  };

  // extend the theme
  const customTheme = extendTheme({ config });

  return (
    <NativeBaseProvider theme={customTheme}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        {
          !login.hasLogin
          ? (
              login.hasAccount
              ? <LoginScreen />
              : <RegisterScreen />
            )
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