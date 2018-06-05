import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Easing,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  Animated
} from 'react-native';
import { MapView, Permissions, Location, Constants } from 'expo';
import { Button, Icon } from 'react-native-elements';
import metro from '../json/metro.json';

class Metro extends Component {

  constructor(props) {
    super(props);
    const markerOpacity = new Animated.Value(0.7);
    const markerRatio = new Animated.Value(1);

    this.state = {
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
      touched: false,
      siteId: null,
      markerOpacity,
      markerRatio
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
          onPress={
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

  scalingTouchedSite(siteId) {
    const { 
      markerRatio, 
      markerOpacity 
    } = this.state;
    const scaleStyle = {
      transform: [
        {
          scale: markerRatio,
        },
      ],
    };

    const opacityStyle = {
      opacity: markerOpacity,
    };

    if (siteId == this.state.siteId) {
      return (
        <Animated.View
          style={[{
            width: 30,
            height: 30,
            borderRadius: 15,
            opacity: 0.7,
            backgroundColor: "rgba(130,4,150, 0.9)",
            borderWidth: 2,
          }, scaleStyle, opacityStyle]}
        />
      );
    }
    return (
      <Animated.View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          opacity: 0.7,
          backgroundColor: "rgba(130,4,150, 0.9)",
          borderWidth: 2,
        }}
      />

    );
  }

  startAnimation(siteId) {
    if (!this.state.touched) {
      this.setState({ touched: true, siteId });

      Animated.parallel([
        Animated.timing(this.state.markerRatio, {
          toValue: 3.5,
          duration: 2000,
          easing: Easing.easeInCirc
        }),
        Animated.timing(this.state.markerOpacity, {
          toValue: 0.35,
          duration: 2000,
          easing: Easing.easeInCirc
        })
      ]).start(() => this.startAnimation());

    } else {
      this.setState({ touched: false });
      Animated.parallel([
        Animated.timing(this.state.markerRatio, {
          toValue: 1,
          duration: 2000,
          easing: Easing.easeOutCirc
        }),
        Animated.timing(this.state.markerOpacity, {
          toValue: 0.7,
          duration: 2000,
          easing: Easing.easeOutCirc
        })
      ]).start();
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
            >
              <TouchableWithoutFeedback
                onPress={() => this.startAnimation(site.id)}
              >

                {this.scalingTouchedSite(site.id)}

              </TouchableWithoutFeedback>

            </MapView.Marker>
          ))}

        </MapView>
      </View>
    );
  }
}

export default Metro;
