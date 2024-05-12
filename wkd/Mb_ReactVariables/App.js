import React, { useState, useRef } from "react";
import { useColorScheme, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GluestackUIProvider,
  Pressable,
  Text,
  Center,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import LottieView from "lottie-react-native";

const App = () => {
  const colorScheme = useColorScheme();
  const [state, setState] = useState(0);
  const ref = useRef(0);
  let variable = 0;

  const onPress = () => {
    setState(state + 1);
    ref.current += 1;
    variable += 1;
  };
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <Center marginTop={"40%"}>
          <Pressable onPress={onPress}>
            <Text style={fontStyle}>state = {state}</Text>
            <Text style={fontStyle}>ref = {ref.current}</Text>
            <Text style={fontStyle}>variable = {variable}</Text>
          </Pressable>
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

const fontStyle = { fontSize: 32, marginBottom: 32 };

export default App;
