import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "./accountReducer";

const initialState = { };
const reducer = combineReducers({
  account: accountReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;


