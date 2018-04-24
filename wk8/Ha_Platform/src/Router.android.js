import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Albums from './components/Albums';
import Details from './components/Details';
import Me from './components/Me';
import Setting from './components/Setting';

const AlbumStack = StackNavigator({
  Albums: {
    screen: Albums,
  },
  Details: {
    screen: Details,
  },
},
);

const MeStack = StackNavigator({
  Me: {
    screen: Me,
  }
});

const SettingStack = StackNavigator({
  Setting: {
    screen: Setting,
  }
});


export const TabRouter = TabNavigator(
  {
    Albums: {
      screen: Albums,
    },
    Me: {
      screen: Me,
    },
    Setting: {
      screen: Setting,
    },
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        // fontSize: 30,
      },
      tabStyle: {
        // width: 100,
        marginTop: 20,
      },
      style: {
        // backgroundColor: 'red',
      },
    }
  }
);