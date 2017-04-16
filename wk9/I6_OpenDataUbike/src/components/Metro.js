import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import metro from '../json/metro.json';

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
         latlng: {
            longitude: 121.544637,
            latitude: 25.024624
         },
         description: 'This is NTUE'
      },
      metro: []

   }

   componentWillMount() {
      this.setState({ metro });
      navigator.geolocation.getCurrentPosition(
         (position) => {
            console.log(position);
            this.setState({
               region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  longitudeDelta: 0.01,
                  latitudeDelta: 0.02
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

               {this.state.metro.map(site => (
                  <MapView.Marker
                     coordinate={{latitude: site.latitude, longitude: site.longitude}}
                     key={`${site.id}${site.line}`}
                     title={site.name}
                     description={site.address}
                     image={require('../assets/flag-pink.png')}
                 />
               ))}

            </MapView>
         </View>
      );
   }
}

export default Metro;
