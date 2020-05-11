import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import Svg, { Circle } from "react-native-svg";

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
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
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
      })();
    }
  }, []);

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
        >
          <Svg height={100} width={100}>
            <Circle
              cx={50}
              cy={50}
              r={10}
              stroke="red"
              strokeWidth="5"
              fill="orange"
            />
          </Svg>
        </MapView.Marker>
      </MapView>
    </View>
  );
};

export default App;
