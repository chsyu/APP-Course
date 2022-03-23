import { DefaultTheme, DarkTheme } 
  from '@react-navigation/native';

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
    light400: 'gray',
    primary700: 'white',
    primary100: '#cffafe',
  },
};
