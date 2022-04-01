import { SET_GENERAL_ACCOUNT_INFO, SUCCESS_LOGIN_REQUEST, LOGOUT } from "../constants";

const initialState = {
  general: {
    name: "",
    email: "",
    adrs: "",
    tel: ""
  },
  login: {
    hasLogin: false,
  }
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_GENERAL_ACCOUNT_INFO:
      return { ...state, general: { ...action.payload } };

    case SUCCESS_LOGIN_REQUEST:
      return { ...state, login: { ...state.login, hasLogin: true } };

    case LOGOUT:
      return { ...state, login: { ...state.login, hasLogin: false } };

    default:
      return state;
  }
}
