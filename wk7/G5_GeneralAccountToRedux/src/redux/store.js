import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;




