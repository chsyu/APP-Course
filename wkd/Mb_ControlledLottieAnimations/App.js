import React, { useEffect, useRef } from "react";
import { useColorScheme, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GluestackUIProvider,
  ButtonText,
  Button,
  Box,
  Center,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import LottieView from "lottie-react-native";

const App = () => {
  const colorScheme = useColorScheme();
  const WIDTH = Dimensions.get("window").width;
  const animation = useRef(null);

  const onPress = () => {
    animation.current.play();
  };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <Center flex={1}>
          <LottieView
            ref={animation}
            source={require("./json/download-icon.json")}
            style={{ width: WIDTH, height: WIDTH }}
            loop={false}
          />
          <Button 
            onPress={onPress}
             action="secondary"
             variant="outline"
          >
            <ButtonText
              textAlign={"center"}
              p={3}
              w={WIDTH / 2}
            >
              PLAY
            </ButtonText>
          </Button>
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
