import React, { Component } from 'react';
import { View } from 'react-native';
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

   render() {
      return (
         <View style={{ flex: 1 }}>
            <MapView
               initialRegion={this.state.region}
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
