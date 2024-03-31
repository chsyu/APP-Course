import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = {
   general: {
      name: "",
      email: "",
      adrs: "",
      tel: ""
   }
};

const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      setGeneralAccountInfo: (state, action) => {
         state.general = action.payload;
      }
   },
});

// export state to global
export const selectGeneral = (state) => state.account.general;

// export actions to global
export const { setGeneralAccountInfo } = accountSlice.actions;

// export reducer to global
export default accountSlice.reducer;
