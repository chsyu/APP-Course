import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';

export const UserStack = createStackNavigator({
   UserScreen: {
      screen: UserScreen,
      navigationOptions: {
         title: 'USER-INFO'
      }
   }
});

export const LoginStack = createStackNavigator({
   LoginScreen: LoginScreen,
   UserStack: UserStack
},
   {
      headerMode: 'none',
   }
);
