import { SET_GENERAL_ACCOUNT_INFO } from "../utils/constants";
// import AsyncStorage from '@react-native-async-storage/async-storage';


export const setGeneralAccountInfo = (info) => async (dispatch) => {
  dispatch({
    type: SET_GENERAL_ACCOUNT_INFO,
    payload: info,
  });
  // await AsyncStorage.setItem("generalaccountInfo", JSON.stringify(info));
};
