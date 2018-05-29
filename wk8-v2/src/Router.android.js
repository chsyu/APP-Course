import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
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
    headerMode: 'none',
  }
);

const MeStack = createStackNavigator({
  Me: Me
},
{
  headerMode: 'none',
});

const SettingStack = createStackNavigator({
  Setting: Setting
},
{
  headerMode: 'none',
});


export const TabRouter = createMaterialTopTabNavigator(
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
      activeTintColor: 'white',
      inactiveTintColor: 'lightgray',
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
    },
  }
);


