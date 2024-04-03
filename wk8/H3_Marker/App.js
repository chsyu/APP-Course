import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider, Box } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";

export default function App() {
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
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Box flex={1}>
          <MapView
            region={region}
            style={{ flex: 1 }}
            showsTraffic
          >
            <Marker
              coordinate={marker.coord}
              title={marker.name}
              description={marker.address}
            />
          </MapView>
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};
