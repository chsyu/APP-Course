import React, { useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import { NativeBaseProvider, Text, Pressable, Center, Box } from 'native-base';
import LottieView from "lottie-react-native";

const App = () => {
  const animation = useRef(null);
  const WIDTH = Dimensions.get('window').width;

  const onPress = () => {
    animation.current.play();
  };

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <Box h={WIDTH} w={WIDTH}>
            <LottieView
              ref={animation}
              source={require("./json/download-icon.json")}
              loop={false}
            />
          </Box>
          <Pressable onPress={onPress}>
            {({ isPressed }) => (
              <Text
                textAlign={'center'}
                p={3}
                w={WIDTH / 2}
                bg={isPressed ? "coolGray.200" : "coolGray.100"} 
                borderWidth={1}
                borderColor={'black'}
              >
                PLAY
              </Text>
            )}
          </Pressable>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
