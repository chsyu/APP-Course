import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from 'expo';
import { useFonts } from "@use-expo/font";

import MainDrawerNavigator from './src/navigations/MainDrawerNavigator';
import MainTabNavigator from './src/navigations/MainTabNavigator';

import { StoreProvider } from "./src/stores/AlbumStore";
const PERSISTENCE_KEY = "ALBUMS_NAVIGATION_STATE";

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();

  let [fontsLoaded] = useFonts({
    vinchand: require("./assets/fonts/VINCHAND.ttf"),
  });

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString);
        setInitialNavigationState(state);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  
  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer
        initialState={initialNavigationState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        {Platform.OS === 'ios' ?
          <MainTabNavigator /> :
          <MainDrawerNavigator />}
      </NavigationContainer>
    );
  }
}

export default () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
};