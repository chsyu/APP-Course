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
    name: 'NTUE',
    address: 'He-Ping East Road'
  });
  return (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        style={{ flex: 1 }}
        showsTraffic
        provider="google"
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
