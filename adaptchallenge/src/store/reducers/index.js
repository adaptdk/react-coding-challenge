import { combineReducers } from 'redux';
import BookDatabaseReducer from './book_database_reducer';

const rootReducer = combineReducers({
  bookDatabaseReducer: BookDatabaseReducer,
});

export default rootReducer;
