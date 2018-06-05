import React, { Component } from 'react';
import { Platform, View, ActivityIndicator, Animated } from 'react-native';
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
      markerWidth: 150,
      markerInner: 15,
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
      let deltaRatio = 0.02/this.state.region.latitudeDelta;
      let markerInner = 10*deltaRatio;
      let markerWidth = 200*deltaRatio;
      markerInner = markerInner<5? 5 : markerInner;
      markerInner = markerInner>10 ? 10 : markerInner;
      markerWidth = markerWidth>150? 150: markerWidth;
      markerWidth = markerWidth<100 ? 100 : markerWidth;
      console.log(`deltaRatio=${deltaRatio}, markerInner=${markerInner}, markerWidth=${markerWidth}`);
      
      this.setState({ region, markerInner, markerWidth });
   }

   render() {

      const { markerInner, markerWidth } = this.state;
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
                  >
                  <Svg height={markerWidth} width={markerWidth}>
                    <VictoryPie
                      standalone={false}
                      innerRadius={markerInner}
                      labels={() => null}
                      style = {{data: {fillOpacity: 0.8}}}
                      colorScale={["#8BB5C9", "#EC6337"]}
                      padAngle={3}
                      data={generateRandomData(2)}
                      width={markerWidth} height={markerWidth}
                      animate={{ duration: 3000, easing: "bounce" }}
                    />
                  </Svg>
                  </MapView.Marker>
               ))}

            </MapView>
         </View>
      );
   }
}

export default Metro;
