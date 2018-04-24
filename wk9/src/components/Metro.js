import React, { Component } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { MapView, Permissions, Location, Constants } from 'expo';
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
      metro: [],
      errorMessage: null
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

   componentWillMount() {
      this.setState({ metro });
      if (Platform.OS === 'android' && !Constants.isDevice) {
         this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
         });
      } else {
         this._getLocationAsync();
      }
   }

   _getLocationAsync = () => {
      Permissions.askAsync(Permissions.LOCATION)
         .then(status => {
            if (status !== 'granted') {
               this.setState({
                  errorMessage: 'Permission to access location was denied',
               });
            }

         });

      Location.getCurrentPositionAsync({}).then(location => {
         console.log(location.coords);
         this.setState({
            region: {
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
               longitudeDelta: 0.01,
               latitudeDelta: 0.02
            }
         });
      });
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

      console.log(this.state.metro);
   
      return (
         <View style={{ flex: 1 }}>
            <MapView
               region={this.state.region}
               style={{ flex: 1 }}
               onRegionChangeComplete={this.onRegionChangeComplete}
            >

               {this.state.metro.map(site => (
                  <MapView.Marker
                     coordinate={{ latitude: site.latitude, longitude: site.longitude }}
                     key={`${site.id}${site.line}`}
                     title={site.name}
                     description={site.address}
                  // image={require('../assets/flag-pink.png')}
                  />
               ))}

            </MapView>
         </View>
      );
   }
}

export default Metro;
