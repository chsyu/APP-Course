import React, { Component } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
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
        errorMessage: null
    }

    componentWillMount() {
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
