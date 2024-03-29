import React from "react";
import { NativeBaseProvider, Center, HStack, Button, Text } from "native-base";
import { useDispatch, useSelector, Provider } from "react-redux";
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { counterValue: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCounter: (state, action) => {
      state.counterValue = action.payload;
    },
  },
});

const selectCounter = (state) => state.counter.counterValue;
const { setCounter } = counterSlice.actions;

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
    <NativeBaseProvider>
      <Center flex={1}>
        <HStack space={20}>
          <Button borderRadius={0} width={70} onPress={() => dispatch(setCounter(counterValue + 1))}>
            <Text fontSize={40} color="white">+</Text>
          </Button>
          <Button borderRadius={0} width={70} onPress={() => dispatch(setCounter(counterValue - 1))}>
            <Text fontSize={40} color="white">-</Text>
          </Button>
        </HStack>
        <Text fontSize={40} mt={20}>
          {counterValue}
        </Text>
      </Center>
    </NativeBaseProvider>
  );
}

// Wrap whole screen in a provider
const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
