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

// export state to global
export const selectGeneral = (state) => state.account.general;
export const selectHasLogin = (state) => state.account.login.hasLogin;

// export actions to global
export const { setGeneralAccountInfo, login, logout } = accountSlice.actions;

// export reducer to global
export default accountSlice.reducer;
