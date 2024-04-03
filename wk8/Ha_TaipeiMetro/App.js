import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { GluestackUIProvider, Box, Center } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import mapStyle from "./styles/mapStyle.json";
import metroJson from "./json/metro.json";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [metro, setMetro] = useState(metroJson);

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
    setOnCurrentLocation(false);
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
    let location = await Location.getCurrentPositionAsync({});
    setRegionAndMarker(location);
    setOnCurrentLocation(true);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Box flex={1}>
          <MapView
            initialRegion={region}
            style={{ flex: 1 }}
            showsTraffic
            // onRegionChangeComplete={onRegionChangeComplete}
            provider="google"
            customMapStyle={mapStyle}
          >
            {metro.map((site) => (
              <Marker
                coordinate={{
                  latitude: site.latitude,
                  longitude: site.longitude,
                }}
                key={`${site.id}${site.line}`}
                title={site.name}
                description={site.address}
              >
                <Center
                  bg="white"
                  borderRadius={60}
                  p={2}
                  borderWidth={2}
                  borderColor="black"
                >
                  <Icon name={"bus"} size={30} color="black" />
                </Center>
              </Marker>
            ))}
          </MapView>
          {!onCurrentLocation && (
            <Box
              bg="white"
              borderRadius={60}
              position="absolute"
              shadow="2"
              zIndex={99}
              right={5}
              bottom={5}
            >
              <Ionicons
                name={"locate-outline"}
                size={60}
                color="black"
                onPress={getLocation}
              />
            </Box>
          )}
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
