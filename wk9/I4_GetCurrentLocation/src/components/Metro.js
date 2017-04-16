import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';

class Metro extends Component {

   state = {
      mapLoaded: false,
      region: {
         longitude: 121.544637,
         latitude: 25.024624,
         longitudeDelta: 0.01,
         latitudeDelta: 0.02
      },
      marker: {
         longitude: 121.544637,
         latitude: 25.024624
      },

   }

   componentWillMount() {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            console.log(position);
            this.setState({
               region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  longitudeDelta: 0.01,
                  latitudeDelta: 0.02
               },
               marker: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
               }
            });
         },
         null,
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

   }


   componentDidMount() {
      this.setState({ mapLoaded: true });
   }

   onRegionChangeComplete = (region) => {
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
            >
               <MapView.Marker
                  coordinate={this.state.marker}
                  title='I am here!'
                  // image={require('../assets/flag-blue.png')}
               />
            </MapView>
         </View>
      );
   }
}

export default Metro;
