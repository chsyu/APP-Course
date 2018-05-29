import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import SettingScreen from './screens/SettingScreen';

export const UserStack = createStackNavigator({
        UserScreen: UserScreen,
        SettingScreen: SettingScreen
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            if (routeName === 'UserScreen') {
                return {
                    title: 'USER-INFO',
                    headerRight: (
                        <Icon
                            name='settings'
                            iconStyle={{ marginRight: 10 }}
                            onPress={() => navigation.navigate('SettingScreen')}
                        />
                    ),
                    headerLeft: null,
                }

            } else if (routeName === 'SettingScreen') {
                return {
                    title: 'SETTING',
                    headerRight: null,
                    headerLeft: (
                        <Icon
                            name='navigate-before'
                            iconStyle={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('UserScreen')}
                        />

                    ),
                }
            }

        }
    }
);

export const LoginStack = createStackNavigator({
    LoginScreen: LoginScreen,
    UserStack: UserStack
},
    {
        headerMode: 'none',
    }
);
