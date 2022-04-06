import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Part1: Define Slice (including reducers and actions)
const initialState = {
   general: {
      name: "",
      email: "",
      adrs: "",
      tel: ""
   },
   login: {
      hasLogin: false,
   }
};

const accountSlice = createSlice({
   name: 'account',
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setGeneralAccountInfo: (state, action) => {
         state.general = action.payload;
      },
      login: (state) => {
         state.login.hasLogin = true;
      },
      logout: (state) => {
         state.login.hasLogin = false;
      }
   },
});

// export actions to global
export const { setGeneralAccountInfo, login, logout } = accountSlice.actions;

// export states to global
export default accountSlice.reducer;
