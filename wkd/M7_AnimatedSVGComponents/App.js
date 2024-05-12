import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, HStack, VStack } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import CircleCounter from './components/CircleCounter';

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
      <VStack m={10} mt={60}>
          <HStack mt={30} justifyContent="space-around">
            <CircleCounter size={50} count={100} stroke_color={'#444B6F'} />
            <CircleCounter size={50} count={255} stroke_color={'darkorange'}/>
          </HStack>
          <HStack mt={30} justifyContent="space-around">
            <CircleCounter size={50} count={200} stroke_color={'darkblue'} />
            <CircleCounter size={50} count={511} stroke_color={'darkred'} />
          </HStack>
        </VStack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
