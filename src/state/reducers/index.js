import { combineReducers } from "redux";
import booksReducer from "state/reducers/booksReducer";

const reducers = combineReducers({
  books: booksReducer,
});

export default reducers;
