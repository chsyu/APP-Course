import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import { NativeBaseProvider, Center, Box } from 'native-base';
import LottieView from "lottie-react-native";

const App = () => {
  const WIDTH = Dimensions.get('window').width;

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <Box h={WIDTH} w={WIDTH}>
            <LottieView
              source={require("./json/download-icon.json")}
              loop
              autoPlay
            />
          </Box>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
