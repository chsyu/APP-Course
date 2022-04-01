import { SET_COLOR_MODE } from "../constants";

const initialState = {
  display: {
    colorMode: 'light'
  },
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_COLOR_MODE:
      return { ...state, display: { colorMode: action.payload } };

    default:
      return state;
  }
}
