import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { GluestackUIProvider, Box, Center } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import mapStyle from "./styles/mapStyle.json";
import { getAdrsFromLatLng } from "./api";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);

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

  const getAdrs = async () => {
    const adrs = await getAdrsFromLatLng(region.latitude, region.longitude);
    setMarker({
      ...marker,
      name: adrs.timezone,
      address: adrs.city,
    });
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getAdrs();
  }, [region]);

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
              <Icon name={"map-marker"} size={60} color="#B12A5B"/>
            </Marker>
          </MapView>
          {!onCurrentLocation && (
            <Center
              bg="gray"
              width={50}
              height={50}
              borderRadius={50}
              position="absolute"
              hardShadow="9"
              zIndex={99}
              right={15}
              bottom={15}
            >
              <Ionicons
                name={"locate-outline"}
                size={40}
                color="white"
                onPress={getLocation}
              />
            </Center>
          )}
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
