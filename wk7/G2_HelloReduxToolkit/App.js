import React from "react";
import {
  GluestackUIProvider,
  Center,
  HStack,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useDispatch, useSelector, Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Part1: Define Slice (including reducers and actions)
const initialState = { counterValue: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increaseCounter: (state) => {
      state.counterValue += 1;
    },
    decreaseCounter: (state) => {
      state.counterValue -= 1;
    },
  },
});

const selectCounter = (state) => state.counter.counterValue;
const { increaseCounter, decreaseCounter } = counterSlice.actions;

// Part2: Combine Reducers and Create a Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Then, you can use the redux state management:
// get states by useSelector
// send actions by useDispatch
const Screen = () => {
  // Get states from store
  const counterValue = useSelector(selectCounter);

  // Define a dispatch to send actions
  const dispatch = useDispatch();

  return (
    <GluestackUIProvider config={config}>
      <Center flex={1}>
        <HStack space="3xl">
          <Button
            borderRadius={0}
            $xl-p={10}
            height={50}
            onPress={() => dispatch(increaseCounter())}
          >
            <ButtonText size="2xl" color="white">
              +
            </ButtonText>
          </Button>
          <Button
            borderRadius={0}
            $xl-p={10}
            height={50}    
            onPress={() => dispatch(decreaseCounter())}
          >
            <ButtonText size="2xl" color="white">
              -
            </ButtonText>
          </Button>
        </HStack>
        <Text size="2xl" mt={20}>
          {counterValue}
        </Text>
      </Center>
    </GluestackUIProvider>
  );
};

// Wrap whole screen in a provider
const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
