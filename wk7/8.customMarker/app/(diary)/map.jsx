import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          title="國立台北教育大學"
          description="台北市和平東路二段134號"
        >
          <View className="bg-fab rounded-[20px] w-[40px] h-[40px] h-10 px-3 justify-center items-center border-[3px] border-white shadow-lg">
            <Text className="text-white text-base font-bold">教</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
}
