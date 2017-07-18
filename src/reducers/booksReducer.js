import actionTypes from '../actions/actionTypes';

import initialState from './initialState';

// PLACEHOLDER
export default function booksRd(state = initialState.booksRd, action) {

  switch (action.type) {

    case actionTypes.FETCH_BOOK_LIST_SUCCESS: {
      return {
        ...state,
        bookList: action.bookList
      };
    }

    default:
      return state;

  }
}
