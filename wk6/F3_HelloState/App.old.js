import React from "react";
import { NativeBaseProvider, Center, HStack, Button, Text } from "native-base";

let counter = 0;

const App = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <HStack space={20}>
          <Button borderRadius={0} width={70} onPress={() => { counter += 1 }}>
            <Text fontSize={40} color={"white"}>+</Text>
          </Button>
          <Button borderRadius={0} width={70} onPress={() => { counter -= 1 }}>
            <Text fontSize={40} color={"white"}>-</Text>
          </Button>
        </HStack>
        <Text fontSize={40} mt={20}>
          {counter}
        </Text>
      </Center>
    </NativeBaseProvider>  );
};


export default App;
