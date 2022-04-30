import { useState, useEffect } from 'react';
import { Platform } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Center, Text } from 'native-base';
import * as Location from 'expo-location';
import * as Device from "expo-device";

export default function App() {
  const [msg, setMsg] = useState("Waiting...");

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMsg(JSON.stringify(location));
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
        <Center flex={1} mx={2}>
          <Text textAlign={"center"}>
            {msg}
          </Text>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}