import React, { useEffect, useState } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, Pressable, Text, Box, VStack, HStack, ScrollView  } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
  Layout,
  RotateInDownLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798DE';

const AnimatedBox = Animated.createAnimatedComponent(Box);


const App = () => {
  const colorScheme = useColorScheme();

  const initialMode = useSharedValue(true);

  useEffect(() => {
    initialMode.value = false;
  }, []);

  const [items, setItems] = useState([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

  const onAdd = () => {
    setItems([...items, { 
      id: items[items.length - 1]?.id >= 0 
      ? (items[items.length - 1].id + 1) 
      : 0 
    }])
  }

  const onDelete = (itemId) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
      <VStack flex={1}>
          <Pressable
            onPress={onAdd}
            position="absolute" right={"5%"} bottom={50}
            p={4} borderRadius={80}
            bg="#0e7490" shadow={2} justifyContent="center" alignItems="center" zIndex={99}
          >
            <MaterialCommunityIcons name="plus" color="white" size={40} />
          </Pressable>
          <ScrollView flex={1} py={50} >
            {items.map((item, index) => {
              return (
                <AnimatedBox
                  key={item.id}
                  entering={
                    initialMode.value ? FadeIn.delay(100 * index) : FadeIn
                  }
                  exiting={FadeOut}
                  layout={Layout.delay(100)}
                  onTouchEnd={() => onDelete(item.id)}
                  h={70}
                  w="90%"
                  bg={LIST_ITEM_COLOR}
                  my={3}
                  borderRadius={20}
                  alignSelf='center'
                  justifyContent='center'
                  alignItems='center'
                  shadow="4"
                >
                  <Text color="white" fontSize={32} fontWeight="200">
                    {item.id}
                  </Text>
                </AnimatedBox>
              );
            })}
          </ScrollView>
        </VStack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
