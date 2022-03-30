import { SET_COUNTER } from "../constants";

// Part3: Define Reducers
const initialCounter = { counter: 0 };

const counterReducer = (state = initialCounter, action) => {
  switch (action.type) {

    case SET_COUNTER:
      return { counter: action.payload };

    default:
      return state;
  }
}

export default counterReducer;
