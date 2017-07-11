import { API_ROOT } from '../../utils/constants';

// Actions
const REQUEST_BOOKS = 'rcc/books/REQUEST_BOOKS';
const RECEIVE_BOOKS = 'rcc/books/RECEIVE_BOOKS';
const SELECT_BOOK = 'rcc/books/SELECT_BOOK';
const UPDATED_BOOK = 'rcc/books/UPDATED_BOOK';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_BOOKS:
    case RECEIVE_BOOKS:
      return {
        ...state,
        all: action.all,
      };
    case SELECT_BOOK:
    case UPDATED_BOOK:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
}

// Action Creators
export const selectBook = (selected) => ({
  type: SELECT_BOOK,
  selected,
});

const requestBooks = () => ({ type: REQUEST_BOOKS });

export const receiveBooks = (all) => {
  return {
    type: RECEIVE_BOOKS,
    all,
  };
};

export function updatedBook(selected) {
  return {
    type: UPDATED_BOOK,
    selected,
  };
}

export const updateBook = (book, subjects) => dispatch => {
  return fetch(`${API_ROOT}/books/${book.id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((selected) => {
      dispatch(updatedBook(selected));
      dispatch(fetchBooks(subjects));
    });
};

export const fetchBooks = (subjects) => (dispatch) => {
  dispatch(selectBook()); // Reset selected book
  dispatch(requestBooks());
  return fetch(`${API_ROOT}/books?subjects_like=${subjects}`)
    .then((response) => response.json())
    .then((subjects) => dispatch(receiveBooks(subjects)));
};
