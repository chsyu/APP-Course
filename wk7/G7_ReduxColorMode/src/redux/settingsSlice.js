import { createSlice } from '@reduxjs/toolkit';


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
      toggleColorMode: (state) => {
         state.display.colorMode = state.display.colorMode === 'light' ? 'dark' : 'light';
      },
   },
});

// export state to global
export const selectColorMode = (state) => state.settings.display.colorMode;

// export actions to global
export const { toggleColorMode } = settingsSlice.actions;

// export reducer to global
export default settingsSlice.reducer;
