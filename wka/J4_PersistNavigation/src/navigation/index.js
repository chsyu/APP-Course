import React from 'react';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { NativeBaseProvider, extendTheme, KeyboardAvoidingView } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'native-base';
import { useColorMode } from 'native-base';

import MyTheme from '../Theme';
import { MyTabs } from './MyTabs';
import { MyDrawer } from './MyDrawers';
import LoginScreen from '../screens/LoginScreen';
import { selectHasLogin } from "../redux/store/accountSlice";
import { selectColorMode } from '../redux/store/settingsSlice';
import { selectnavigationState } from '../redux/store/navigationSlice';
import { setNavigationState } from '../redux/store/navigationSlice';

const Navigation = () => {
  const { colorMode } = useColorMode();
  const initialColorMode = useSelector(selectColorMode);
  const hasLogin = useSelector(selectHasLogin);
  const navigationState = useSelector(selectnavigationState)

  const dispatch = useDispatch();

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
          !hasLogin
          ? (<LoginScreen />)
          : (
            <NavigationContainer 
              theme={MyTheme} 
              initialState={navigationState}
              onStateChange={ (state) => dispatch(setNavigationState(state)) }
            >
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