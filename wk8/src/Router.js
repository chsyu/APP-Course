import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from './components/Login';
import Albums from './components/Albums';
import Details from './components/Details';
import Me from './components/Me';
import Setting from './components/Setting';

export const AlbumStack = StackNavigator({
  Albums: {
    screen: Albums,
    navigationOptions: {
      header: () => ({
        title: 'ALBUMS',
      })
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      header: ({ state }) => ({
        title: `${state.params.title.toUpperCase()}`,
      })
    },
  },
});

export const MeStack = StackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      header: () => ({
        title: 'ME',
      })
    },
  },
},
  {
    // headerMode: 'none',
  }
);

export const SettingStack = StackNavigator({
  Setting: {
    screen: Setting,
    navigationOptions: {
      header: () => ({
        title: 'SETTING',
      })
    },
  },
});

export const TabRouter = TabNavigator(
  {
    AlbumStack: {
      screen: AlbumStack,
      navigationOptions: {
        tabBar: {
          label: 'Albums',
          icon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
        },
      },
    },
    MeStack: {
      screen: MeStack,
      navigationOptions: {
        tabBar: {
          label: 'Me',
          icon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
      },
    },
    SettingStack: {
      screen: SettingStack,
      navigationOptions: {
        tabBar: {
          label: 'Setting',
          icon: ({ tintColor }) => <Icon name="build" size={35} color={tintColor} />
        },
      },
    },
  },
  {
    animationEnabled: 'true',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      inactiveBackgroundColor: '#73B9C3',
      activeBackgroundColor: '#575F72'
    }
  }
);

export const LoginStack = StackNavigator({
  Login: {
    screen: Login,
  },
  TabRouter: {
    screen: TabRouter,
  },
},
  {
    headerMode: 'none',
  }
);