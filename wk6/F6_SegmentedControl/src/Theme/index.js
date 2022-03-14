import { DefaultTheme } from '@react-navigation/native';

const MyTheme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
     light400: '#a8a29e',
     primary700: '#0e7490',
     primary100: '#cffafe',
   },
 };

 export default MyTheme;