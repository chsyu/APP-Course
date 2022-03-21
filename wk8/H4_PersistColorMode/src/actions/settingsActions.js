import { SET_COLOR_MODE } from "../utils/constants";


export const setColorMode = (colorMode) => async (dispatch) => {
  dispatch({
    type: SET_COLOR_MODE,
    payload: colorMode,
  });
};
