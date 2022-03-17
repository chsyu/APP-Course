import { SET_GENERAL_ACCOUNT_INFO } from "../utils/constants";

export const setGeneralAccountInfo = (info) => (dispatch) => {
  dispatch({
    type: SET_GENERAL_ACCOUNT_INFO,
    payload: info,
  });
};
