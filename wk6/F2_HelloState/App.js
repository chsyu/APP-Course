import React, { useState } from "react";
import {
  GluestackUIProvider,
  Center,
  HStack,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <GluestackUIProvider config={config}>
      <Center flex={1}>
        <HStack space="3xl">
          <Button
            onPress={() => setCounter(counter + 1)}
          >
            <ButtonText size="3xl" color="white">
              +
            </ButtonText>
          </Button>
          <Button
            onPress={() => setCounter(counter - 1)}
          >
            <ButtonText size="3xl" color="white">
              -
            </ButtonText>
          </Button>
        </HStack>
        <Text size="3xl" mt="$10">
          {counter}
        </Text>
      </Center>
    </GluestackUIProvider>
  );
};

export default App;
