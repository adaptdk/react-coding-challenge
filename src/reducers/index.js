import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import books from './books'
import subjects from './subjects'
import bookForm from './bookForm'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  books,
  subjects,
  bookForm,
});
