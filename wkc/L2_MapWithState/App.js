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
  return (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        style={{ flex: 1 }}
        showsTraffic
        provider="google"
      />
    </View>
  );
};

export default App;
