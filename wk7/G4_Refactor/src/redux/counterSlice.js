import { configureStore, createSlice } from "@reduxjs/toolkit";

// Part1: Define Slice (including reducers and actions)
const initialState = { counterValue: 0, colorMode: "light" };

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
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
    },
  },
});

export const selectCounter = (state) => state.counter.counterValue;
export const selectColorMode = (state) => state.counter.colorMode;
export const { increaseCounter, decreaseCounter, toggleColorMode } = counterSlice.actions;
export default counterSlice.reducer;