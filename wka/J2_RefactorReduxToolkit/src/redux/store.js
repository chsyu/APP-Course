import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// Part2: Combine Reducers and Create a Store
const store = configureStore({
   reducer: {
     counter: counterReducer
   },
 });

//  export store to global
 export default store;