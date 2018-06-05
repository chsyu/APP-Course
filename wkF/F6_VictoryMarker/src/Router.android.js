import React from 'react';
import {
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Albums from './components/Albums';
import Details from './components/Details';
import Me from './components/Me';
import Setting from './components/Setting';
import Metro from './components/Metro';
import Ubike from './components/Ubike';

export const AlbumStack = createStackNavigator({
  Albums: {
    screen: Albums,
  },
  Details: {
    screen: Details,
    },
  },
);

const MeStack = createStackNavigator({
  Me: {
    screen: Me,
  }
});

const SettingStack = createStackNavigator({
  Setting: {
    screen: Setting,
  }
});

const MetroStack = createStackNavigator({
  Setting: {
    screen: Metro,
  },
});

const UbikeStack = createStackNavigator({
  Setting: {
    screen: Ubike,
  },
})

export const TabRouter = createBottomTabNavigator(
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


export const DrawerRouter = createDrawerNavigator(
  {
    Albums: {
      screen: AlbumStack,
    },
    Metro: {
      screen: MetroStack,
    },
    Ubike: {
      screen: UbikeStack,
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
      labelStyle: { 
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'normal'
      }
    },
    // drawerWidth: 200,
    // drawerPosition: 'right',
    contentComponent:
      props => (
        <ScrollView>
          <Tile
            imageSrc={require('./assets/images.jpg')}
            // featured
          />
          <DrawerItems {...props} />
        </ScrollView>
      )
  }
);




