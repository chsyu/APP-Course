import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';

class Ubike extends Component {

   state = {
      mapLoaded: false,
      region: {
         longitude: 121.544637,
         latitude: 25.024624,
         longitudeDelta: 0.01,
         latitudeDelta: 0.02
      },
      ubike: []

   }

   componentWillMount() {
      axios.get('http://data.ntpc.gov.tw/od/data/api/54DDDC93-589C-4858-9C95-18B2046CC1FC?$format=json')
         .then((response) => {
            console.log(response.data);
            this.setState({ ubike: response.data });
         });
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

               {this.state.ubike.map(site => (
                  <MapView.Marker
                     coordinate={{latitude: Number(site.lat), longitude: Number(site.lng)}}
                     key={site.sno}
                     title={`${site.sna} ${site.sbi}/${site.tot}`}
                     description={site.ar}
                  />
               ))}

            </MapView>
         </View>
      );
   }
}

export default Ubike;
