import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, Animated } from 'react-native';
import { MapView, Permissions, Location, Constants, Svg } from 'expo';
import { Button, Icon } from 'react-native-elements';
import { VictoryPie } from "victory-native";
import { generateRandomData } from "../data";

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
      errorMessage: null,
      markerRadius: 35,
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
               onPress = {
                  () => navigation.openDrawer()
               }
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
         // this.setState({
         //    region: {
         //       latitude: location.coords.latitude,
         //       longitude: location.coords.longitude,
         //       longitudeDelta: 0.01,
         //       latitudeDelta: 0.02
         //    }
         // });
      });
   };

   componentDidMount() {
      this.setState({ mapLoaded: true });
   }

   onRegionChangeComplete = (region) => {
      console.log(region);
      console.log(this.state.markerRadius);
      let markerRadius = 0.35 / this.state.region.longitudeDelta;
      markerRadius = markerRadius < 3.5? 3.5 : markerRadius;
      markerRadius = markerRadius > 35 ? 35 : markerRadius;
      this.setState({ region, markerRadius });
   }

   render() {
      if (!this.state.mapLoaded) {
         return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
               <ActivityIndicator size="large" />
            </View>
         );
      }

      // console.log(this.state.metro);
   
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
                  >
                  <Svg height={150} width={150}>
                    <VictoryPie
                      standalone={false}
                      innerRadius={5}
                      labels={() => null}
                      // labelRadius={35}
                      style = {{data: {fillOpacity: 0.8}}}
                      colorScale={["#8BB5C9", "#EC6337"]}
                      padAngle={3}
                      data={generateRandomData(2)}
                      // animate={{ duration: 1500 }}
                      width={150} height={150}
                    />
                  </Svg>
                  </MapView.Marker>
               ))}

            </MapView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
   },
   marker: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "rgba(130,4,150, 0.9)",
   },
   ring: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "rgba(130,4,150, 0.3)",
      position: "absolute",
      borderWidth: 1,
      borderColor: "rgba(130,4,150, 0.5)",
   },
});

export default Metro;
