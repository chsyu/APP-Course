import { GET_BOOKS } from "../constants"
import { getBooksAPI } from "../api";

export const getBooks = () => async (dispatch) => {
   try {
      const res = await getBooksAPI();
      dispatch({
         type: GET_BOOKS,
         payload: res.data,
      });
   } catch (e) {}
};
