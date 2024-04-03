import { useState, useEffect } from "react";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Icon from "react-native-vector-icons/FontAwesome";
import mapStyle from "./styles/mapStyle.json";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");
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
    // name: "國立臺北教育大學",
    // address: "台北市和平東路二段134號",
  });

  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0004 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0004
    ) {
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

  const setRegionAndMarker = (location) => {
    setRegion({
      ...region,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setMarker({
      ...marker,
      coord: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
      return;
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2000,
        timeInterval: 1000,
      },
      (loc) => setRegionAndMarker(loc)
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Box flex={1}>
          <MapView
            region={region}
            style={{ flex: 1 }}
            showsTraffic
            onRegionChangeComplete={onRegionChangeComplete}
            provider="google"
            customMapStyle={mapStyle}
          >
            <Marker
              coordinate={marker.coord}
              title={marker.name}
              description={marker.address}
            >
              <Icon name={"map-marker"} size={60} color="#B12A5B" />
            </Marker>
          </MapView>
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
