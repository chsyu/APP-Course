import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Part1: Define Slice (including reducers and actions)
const initialState = {
   display: {
     colorMode: 'light'
   },
 };

const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setColorMode: (state, action) => {
         state.display.colorMode = action.payload;
      },
   },
});

// export state to global
export const selectColorMode = (state) => state.settings.display.colorMode;

// export actions to global
export const { setColorMode } = settingsSlice.actions;

// export reducer to global
export default settingsSlice.reducer;
