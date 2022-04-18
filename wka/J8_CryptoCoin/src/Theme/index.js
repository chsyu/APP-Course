import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { extendTheme } from 'native-base';

// DEFINE NAVIGATION THEME
export const lightTheme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
     light400: '#a8a29e',
     primary700: '#0e7490',
     primary100: '#cffafe',
   },
 };

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    light400: '#a8a29e',
    primary700: '#0e7490',
    primary100: '#cffafe',
  },
};

// DEFINE NATIVEBASE THEME
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const customTheme = extendTheme({ config });
