import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';

export const UserStack = StackNavigator({
   UserScreen: {
      screen: UserScreen,
      navigationOptions: {
         title: 'USER-INFO'
      }
   }
});

export const LoginStack = StackNavigator({
   LoginScreen: {
      screen: LoginScreen,
   },
   UserStack: {
      screen: UserStack,
   },
},
   {
      headerMode: 'none',
   }
);
