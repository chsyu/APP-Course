import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Box, Center } from 'native-base';
import * as Location from 'expo-location';
import * as Device from "expo-device";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import mapStyle from "./styles/mapStyle.json"
import metroJson from "./json/metro.json";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [metro, setMetro] = useState(metroJson);

  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.02,
    latitudeDelta: 0.04,
  })
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
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      setRegion(rgn);
      setMarker({
        ...marker,
        coord: {
          longitude: rgn.longitude,
          latitude: rgn.latitude,
        },
      });
      setOnCurrentLocation(false);
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
    if (status !== 'granted') {
      setMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setRegionAndMarker(location);
    setOnCurrentLocation(true);
  }

  useEffect(() => {
    if (Platform.OS === "android" && !Device.isDevice) {
      setMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
      return
    }
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
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
                coordinate={{ latitude: site.latitude, longitude: site.longitude }}
                key={`${site.id}${site.line}`}
                title={site.name}
                description={site.address}
              >
                <Center bg="white" borderRadius={60} p={1} borderWidth={2} borderColor="black">
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
              <Ionicons name={"ios-locate"}
                size={60}
                color="black"
                onPress={getLocation}
              />
            </Box>

          )}
        </Box>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}