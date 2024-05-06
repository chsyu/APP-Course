import { createSlice } from '@reduxjs/toolkit';

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
      hasAccount: false,
   }
};

const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      gotoSignIn: (state) => {
         state.login.hasLogin = false;
         state.login.hasAccount = false;
      },
      gotoSignUp: (state) => {
         state.login.hasLogin = false;
         state.login.hasAccount = true;
      },
      setGeneralAccountInfo: (state, action) => {
         state.general = { ...state.general, ...action.payload};
      },
      setLogin: (state, action) => {
         state.login.hasLogin = true;
         state.general = { ...state.general, ...action.payload};
      },
      setLogout: (state) => {
         state.login.hasLogin = false;
         state.general = {
            name: "",
            email: "",
            adrs: "",
            tel: ""
         }
      }
   },
});

// export state to global
export const selectGeneral = (state) => state.account.general;
export const selectHasLogin = (state) => state.account.login.hasLogin;
export const selectHasAccount = (state) => state.account.login.hasAccount;

// export actions to global
export const { setGeneralAccountInfo, setLogin, setLogout, gotoSignIn, gotoSignUp } = accountSlice.actions;

// export reducer to global
export default accountSlice.reducer;
