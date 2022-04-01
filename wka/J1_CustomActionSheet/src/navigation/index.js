import React from 'react';
import { Platform } from 'react-native';
import { NativeBaseProvider, extendTheme, KeyboardAvoidingView } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'native-base';
import { useColorMode } from 'native-base';

import MyTheme from '../Theme';
import { MyTabs } from './MyTabs';
import { MyDrawer } from './MyDrawers';


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
const customTheme = extendTheme({ config });

const Navigation = () => {
  const { colorMode } = useColorMode();
  return (
    <NativeBaseProvider theme={customTheme}>
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
    </NativeBaseProvider>

  );
}

export default Navigation;