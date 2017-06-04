
import { combineReducers } from 'redux';

import SubjectsReducer from './subjects';
import BooksReducer from './books';

const rootReducer = combineReducers({
  subjects: SubjectsReducer,
  books: BooksReducer
});

export default rootReducer;
