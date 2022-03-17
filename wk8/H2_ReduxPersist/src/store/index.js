import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { accountReducer } from "./accountReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['general']
};

const reducer = combineReducers({
  account: persistReducer(persistConfig, accountReducer),
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);


