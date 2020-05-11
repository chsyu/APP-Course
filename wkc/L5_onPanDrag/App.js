import React, { useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

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
    name: "NTUE",
    address: "He-Ping East Road",
  });
  const [mapDragging, setMapDragging] = useState(false);
  const onRegionChangeComplete = (rgn) => {
    if (mapDragging) {
      setMapDragging(false);
      setRegion(rgn);
      setMarker({
        ...marker,
        coord: {
          longitude: rgn.longitude,
          latitude: rgn.latitude,
        },
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        style={{ flex: 1 }}
        showsTraffic
        provider="google"
        onPanDrag={() => setMapDragging(true)}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <MapView.Marker
          coordinate={marker.coord}
          title={marker.name}
          description={marker.address}
        />
      </MapView>
    </View>
  );
};

export default App;
