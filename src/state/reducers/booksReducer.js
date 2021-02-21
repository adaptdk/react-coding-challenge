import { ActionType } from "state/action-types";

const initialState = {
  loading: false,
  error: null,
  data: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEARCH_BOOKS:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_BOOKS_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_BOOKS_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
