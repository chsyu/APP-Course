import React, { useState, useDebugValue } from "react";
import { NativeBaseProvider, Center, HStack, Button, Text, Switch } from "native-base";

const App = () => {
  const useStateWithLabel = (initialValue, label) => {
    const [value, setValue] = useState(initialValue);
    useDebugValue(`${label}: ${value}`);
    return [value, setValue];
  };
  
  const [count, setCount] = useStateWithLabel(0, "count");
  const [colorMode, setColorMode] = useStateWithLabel("light", "colorMode");
  const toggleColorMode = () => {
    if (colorMode == "light") setColorMode("dark");
    else setColorMode("light")
  }
  return (
    <NativeBaseProvider>
      <Center flex={1} bg={colorMode == "light" ? "white" : "black"}>
        <HStack space={20}>
          <Button borderRadius={0} width={70} onPress={() => setCount(count + 1)}>
            <Text fontSize={40} color={colorMode == "light" ? "white" : "black"}>+</Text>
          </Button>
          <Button borderRadius={0} width={70} onPress={() => setCount(count - 1)}>
            <Text fontSize={40} color={colorMode == "light" ? "white" : "black"}>-</Text>
          </Button>
        </HStack>
        <Text fontSize={40} mt={20} color={colorMode == "dark" ? "white" : "black"}>
          {count}
        </Text>
        <HStack mt={20} space={8} alignItems="center" >
          <Text fontSize="lg" color={colorMode == "dark" ? "white" : "black"}>
            {colorMode == "light" ? "Light Mode" : "Dark Mode"}
          </Text>
          <Switch
            name="light Mode"
            isChecked={colorMode === "light"}
            onToggle={toggleColorMode}
            accessibilityLabel="display-mode"
            accessibilityHint="light or dark mode"
          />
        </HStack>

      </Center>
    </NativeBaseProvider>
  );
};


export default App;
