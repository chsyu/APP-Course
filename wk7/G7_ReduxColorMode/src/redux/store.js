import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountSlice";
import settingReducer from "./settingsSlice";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    account: persistReducer(persistConfig, accountReducer),
    settings: persistReducer(persistConfig, settingReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

persistStore(store);





