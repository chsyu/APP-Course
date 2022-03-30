import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import counterReducer from "./counterReducer";

// Part4: Combine Reducers and Create a Store
const reducer = combineReducers({
   counter: counterReducer,
 });
 
 const store = createStore(
   reducer,
   applyMiddleware(thunk)
 );

 export default store;
 