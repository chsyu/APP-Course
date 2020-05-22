import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import mapStyle from "./styles/mapStyle.json";

const App = () => {
  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  });
  const [marker, setMarker] = useState({
    coord: {
      longitude: 121.544637,
      latitude: 25.024624,
    },
    name: "國立臺北教育大學",
    address: "台北市和平東路二段134號",
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={region}
        style={{ flex: 1 }}
        showsTraffic
        provider="google"
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={marker.coord}
          title={marker.name}
          description={marker.address}
        >
          <View style={styles.ring} />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderWidth: 5,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

export default App;
