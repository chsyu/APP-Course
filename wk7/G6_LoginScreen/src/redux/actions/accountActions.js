import { SET_GENERAL_ACCOUNT_INFO, SUCCESS_LOGIN_REQUEST, LOGOUT } from "../constants";

export const setGeneralAccountInfo = (info) => (dispatch) => {
  dispatch({
    type: SET_GENERAL_ACCOUNT_INFO,
    payload: info,
  });
};

export const login = () => (dispatch) => {
  dispatch({
    type: SUCCESS_LOGIN_REQUEST,
  });
}

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
}
