import React from 'react';
import { DrawerNavigator, TabNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';

import Login from './components/Login';
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


