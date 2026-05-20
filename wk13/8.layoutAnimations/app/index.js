import "../global.css";

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const App = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const [items, setItems] = useState([
    { id: 0 },{ id: 1 },{ id: 2 },
    { id: 3 },{ id: 4 },
  ]);

  const onAdd = () => {
    setItems([
      ...items,
      {
        id:
          items[items.length - 1]?.id >= 0 ? items[items.length - 1].id + 1 : 0,
      },
    ]);
  };

  const onDelete = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <Pressable
          onPress={onAdd}
          className="absolute bottom-[50px] right-[5%] z-[99] items-center justify-center rounded-full bg-cyan-700 p-4 shadow-md"
        >
          <MaterialCommunityIcons name="plus" color="white" size={40} />
        </Pressable>

        <ScrollView className="flex-1 py-[50px]">
          {items.map((item, index) => (
            <AnimatedView
              key={item.id}
              entering={
                isFirstRender.current ? FadeIn.delay(100 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={Layout.delay(100)}
              onTouchEnd={() => onDelete(item.id)}
              className="my-1.5 h-[70px] w-[90%] items-center justify-center self-center rounded-[20px] bg-[#1798DE] shadow-lg"
            >
              <Text className="text-[32px] font-extralight text-white">
                {item.id}
              </Text>
            </AnimatedView>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
