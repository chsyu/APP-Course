import React from 'react';
import { DrawerNavigator, TabNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Albums from './components/Albums';
import Details from './components/Details';
import Me from './components/Me';
import Setting from './components/Setting';

export const AlbumStack = StackNavigator({
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
      screen: AlbumStack,
    },
    Me: {
      screen: MeStack,
    },
    Setting: {
      screen: SettingStack,
    },
  },
  {
    animationEnabled : true,
  }
);

export const DrawerRouter = DrawerNavigator(
  {
    Albums: {
      screen: AlbumStack,
    },
    Me: {
      screen: MeStack,
    },
    Setting: {
      screen: SettingStack,
    },
  },
  {
    initialRouteName: 'Albums',
    contentOptions: {
      activeTintColor: '#e91e63',
      labelStyle: { fontSize: 20 }
    },
    // drawerWidth: 200,
    // drawerPosition: 'right',
    contentComponent:
      props => (
        <ScrollView>
          <Tile
            imageSrc={require('./assets/ntue.jpg')}
            featured
          />
          <DrawerItems {...props} />
        </ScrollView>
      )
  }
);




