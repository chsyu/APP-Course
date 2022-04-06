import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


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

// export actions to global
export const { setCounter } = counterSlice.actions;

// export states to global
export default counterSlice.reducer;
