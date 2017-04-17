import React, { Component } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
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
    metro: [],
    errorMessage: null
  }

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

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
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
          initialRegion={this.state.region}
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
