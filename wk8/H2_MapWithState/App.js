import { useState } from 'react';
import MapView from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider, Box } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";

export default function App() {
  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  })
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Box flex={1}>
          <MapView
            region={region}
            style={{ flex: 1 }}
            showsTraffic
            mapType='hybrid'
          />
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};
