import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import Albums from './components/Albums';
import Details from './components/Details';
import Me from './components/Me';
import Setting from './components/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlbumStack = createStackNavigator({
    Albums: Albums,
    Details: Details,
  },
  {
    navigationOptions : ({ navigation }) => {
      const { routeName, params } = navigation.state;
      let titleName;
      if (routeName === 'Albums') {
        titleName = `Album`;
      } else if (routeName === 'Details') {
        titleName = params.title.toUpperCase();
      }     
  
      return {
        title: titleName,
      }
    }
  }
);

const MeStack = createStackNavigator({
  Me: Me
});

const SettingStack = createStackNavigator({
  Setting: Setting
});


export const TabRouter = createBottomTabNavigator(
  {
    Albums:  AlbumStack,
    Me:      MeStack,
    Setting: SettingStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Albums') {
          iconName = `ios-albums${focused ? '' : '-outline'}`;
        } else if (routeName === 'Me') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Setting') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


export const DrawerRouter = createDrawerNavigator(
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


