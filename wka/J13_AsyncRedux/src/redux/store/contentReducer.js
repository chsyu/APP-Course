import { GET_BOOKS } from "../constants";

const initialState = {
  bookData: []
};

export const contentReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_BOOKS:
      return { ...state, bookData: action.payload };

    default:
      return state;
  }
}
