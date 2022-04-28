import { createSlice } from '@reduxjs/toolkit';


// Part1: Define Slice (including reducers and actions)
const initialState = {
   navigationState: null,
 };

const navigationSlice = createSlice({
   name: 'navigation',
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setNavigationState: (state, action) => {
         state.navigationState = action.payload;
      },
   },
});

// export state to global
export const selectnavigationState = (state) => state.navigation.navigationState;

// export actions to global
export const { setNavigationState } = navigationSlice.actions;

// export reducer to global
export default navigationSlice.reducer;
