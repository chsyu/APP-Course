import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import SettingScreen from './screens/SettingScreen';

export const UserStack = StackNavigator({
    UserScreen: {
        screen: UserScreen,
        navigationOptions: {
            header: ({ navigate, state }) => ({
                title: 'USER-INFO',
                right: (
                    <Icon
                        name='settings'
                        iconStyle={{ marginRight: 10 }}
                        onPress={() => navigate('SettingScreen')}
                    />
                ),
            })
        }
    },
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
            title: 'SETTING'
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
