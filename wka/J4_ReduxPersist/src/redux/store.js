import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from "redux-thunk";

import accountReducer from "./accountSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    account: persistReducer(persistConfig, accountReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]

});

export const persistor = persistStore(store);



