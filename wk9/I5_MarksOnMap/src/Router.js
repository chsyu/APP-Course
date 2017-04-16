import React from 'react';
import { Linking, Button, ScrollView } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator, DrawerView } from 'react-navigation';
import { Icon, Tile } from 'react-native-elements';

import Albums from './components/Albums';
import Details from './components/Details';
import Metro from './components/Metro';
import Me from './components/Me';
import Setting from './components/Setting';


export const AlbumStack = StackNavigator({
  Albums: {
    screen: Albums,
    navigationOptions: {
      header: ({ navigate }) => ({
        title: 'ALBUMS',
        left: (
          <Icon
            name='menu'
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigate('DrawerOpen')}
          />
        ),
      })
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      header: ({ state }) => ({
        title: `${state.params.title.toUpperCase()}`,
        right: (
          <Button
            title='Buy'
            onPress={() => Linking.openURL(state.params.url)}
          />
        ),
      })
    },
  },
});

export const MeStack = StackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      header: ({ navigate }) => ({
        title: 'ME',
        left: (
          <Icon
            name='menu'
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigate('DrawerOpen')}
          />
        ),
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
      header: ({ navigate }) => ({
        title: 'SETTING',
        left: (
          <Icon
            name='menu'
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigate('DrawerOpen')}
          />
        ),
      })
    },
  },
});

export const MetroStack = StackNavigator({
  Setting: {
    screen: Metro,
    navigationOptions: {
      header: ({ navigate }) => ({
        title: 'Metro',
        left: (
          <Icon
            name='menu'
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigate('DrawerOpen')}
          />
        ),
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
    Me: {
      screen: Me,
      navigationOptions: {
        tabBar: {
          label: 'Me',
          icon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBar: {
          label: 'Contact Us',
          icon: ({ tintColor }) => <Icon name="build" size={35} color={tintColor} />
        },
      },
    },
  },
  {
    animationEnabled: 'true',
  }
);

export const DrawerRouter = DrawerNavigator(
  {
    AlbumStack: {
      screen: AlbumStack,
      navigationOptions: {
        drawer: {
          label: '專輯',
          icon: ({ tintColor }) => <Icon name="list" size={25} color={tintColor} />
        },
      },
    },

    MetroStack: {
      screen: MetroStack,
      navigationOptions: {
        drawer: {
          label: '捷運',
          icon: ({ tintColor }) => <Icon name="tram" size={25} color={tintColor} />
        },
      },
    },

    MeStack: {
      screen: MeStack,
      navigationOptions: {
        drawer: {
          label: '關於我們',
          icon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />
        },
      },
    },

    SettingStack: {
      screen: SettingStack,
      navigationOptions: {
        drawer: {
          label: '設定',
          icon: ({ tintColor }) => <Icon name="build" size={25} color={tintColor} />
        },
      },
    },
  }, 
  {
    initialRouteName: 'MetroStack',
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
          <DrawerView.Items {...props} />
        </ScrollView>
      )
  }
);


