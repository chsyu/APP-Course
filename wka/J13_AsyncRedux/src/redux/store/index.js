import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { accountReducer } from "./accountReducer";
import { settingsReducer } from "./settingsReducer"
import { contentReducer } from "./contentReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  account: persistReducer(persistConfig, accountReducer),
  settings: persistReducer(persistConfig, settingsReducer),
  content: persistReducer(persistConfig, contentReducer)
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);


