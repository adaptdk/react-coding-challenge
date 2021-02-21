import axios from "axios";
import { ActionType } from "state/action-types";

export const searchBooks = (subject) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.SEARCH_BOOKS,
    });
    try {
      const { data } = await axios.get("http://localhost:3006/books", {
        params: { subjects_like: subject },
      });
      const titles = data.map((result) => {
        return result.title;
      });

      dispatch({
        type: ActionType.SEARCH_BOOKS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_BOOKS_ERROR,
        payload: `${err.message}. Unable to fetch data. Call 112`,
      });
    }
  };
};
