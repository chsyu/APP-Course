import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { MapView } from 'expo';

class Metro extends Component {

   state = {
      mapLoaded: false,
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

   componentDidMount() {
      this.setState({ mapLoaded: true });
   }

   onRegionChangeComplete = (region) => {
      console.log(region);
      this.setState({ region });
   }

   render() {
      if (!this.state.mapLoaded) {
         return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
               <ActivityIndicator size="large" />
            </View>
         );
      }
   
      return (
         <View style={{ flex: 1 }}>
            <MapView
               region={this.state.region}
               style={{ flex: 1 }}
               onRegionChangeComplete={this.onRegionChangeComplete}
            />
         </View>
      );
   }
}

export default Metro;
