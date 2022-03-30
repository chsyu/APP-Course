import { SET_COUNTER } from "../constants";

// Part2: Define Actions
export const setCounter = (counter) => (dispatch) => {
   dispatch({
     type: SET_COUNTER,
     payload: counter,
   });
 };

 