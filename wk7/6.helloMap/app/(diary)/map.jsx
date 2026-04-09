import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {

  const initialRegion = {
    latitude: 25.033,
    longitude: 121.5654,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      / >
    </View>
  );
}
