import React, { useState } from "react";
import {  NativeBaseProvider, Center, 
          HStack, Button, Text } from "native-base";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <NativeBaseProvider>
      <Center flex={1} >
        <HStack space={20}>
          <Button 
            borderRadius={0} width={70} fontSize={40} 
            onPress={() => setCount(count + 1)}
          >
            <Text fontSize={40} color="white">+</Text>
          </Button>
          <Button 
            borderRadius={0} width={70} fontSize={40}
            onPress={() => setCount(count - 1)}
          >
            <Text fontSize={40} color="white">-</Text>
          </Button>
        </HStack>
        <Text fontSize={40} mt={20}>{count}</Text>
      </Center>      
    </NativeBaseProvider>
  );
};


export default App;
