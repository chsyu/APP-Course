import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { GluestackUIProvider, Center, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMsg(JSON.stringify(location));
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Center flex={1} mx={2}>
          <Text textAlign={"center"}>{msg}</Text>
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
