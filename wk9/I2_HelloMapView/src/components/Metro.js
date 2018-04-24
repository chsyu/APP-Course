import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { MapView } from 'expo';

class Metro extends Component {

   state = {
      region: {
         longitude: 121.544637,
         latitude: 25.024624,
         longitudeDelta: 0.01,
         latitudeDelta: 0.02
      }

   }

   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Metro',
         tabBarLabel: 'Metro',
         tabBarIcon: ({ tintColor }) => <Icon name="add-location" size={35} color={tintColor} />,
         drawerLabel: 'Metro',
         drawerIcon: ({ tintColor }) => <Icon name="add-location" size={25} color={tintColor} />,
         headerLeft: (
            <Icon
               name='menu'
               iconStyle={{ marginLeft: 10 }}
               onPress={() => navigation.navigate('DrawerOpen')}
            />
         ),
      }
   };


   render() {
      return (
         <View style={{ flex: 1 }}>
            <MapView
               region={this.state.region}
               style={{ flex: 1 }}
               // mapType='hybrid'
               showsTraffic
               provider='google'
            />
         </View>
      );
   }
}

export default Metro;
