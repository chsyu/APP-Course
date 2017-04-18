import React, { Component } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
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
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  _getLocationAsync = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02
      }
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
            />
          ))}
        </MapView>
        <Icon
          raised
          name='my-location'
          color='white'
          containerStyle={{
            backgroundColor: '#517fa4',
            position: 'absolute',
            right: 20,
            bottom: 40
          }}
          onPress={this._getLocationAsync}
        />
      </View>
    );
  }
}

export default Metro;
