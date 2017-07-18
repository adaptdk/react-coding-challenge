import Api from '../api';

import actionTypes from './actionTypes';

export const setSelectedBook = (selectedBookItem) => ({
  type: actionTypes.BOOK_SELECTED,
  selectedBookItem,
});

const resetBookSelection = () => ({
  type: actionTypes.RESET_BOOK_SELECTION,
  selectedBook: null
});

export const fetchBookListSuccess = (bookList) => {
  return {
    type: actionTypes.FETCH_BOOK_LIST_SUCCESS,
    bookList,
  };
};

export function updateSelectedBook(selectedBook) {
  return {
    type: actionTypes.BOOK_UPDATED,
    selectedBook,
  };
}

export function setBookItemFormField(fieldName, fieldValue) {
  return {
    type: actionTypes.BOOK_ITEM_FORM_FIELD_CHANGE,
    fieldName,
    fieldValue
  };
}

export const postBookItem = (bookItem, subjects) => (dispatch) => {
  return Api.PUT(
    `/books/${bookItem.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookItem),
    }
  ).then((selectedBook) => {
    dispatch(updateSelectedBook(selectedBook));
    dispatch(fetchBookList(subjects));
  });
};

export const fetchBookList = (bookSubject) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_BOOK_LIST });
  return Api.GET(
    `/books?subjects_like=${bookSubject}`
  )
    .then(bookList => dispatch(fetchBookListSuccess(bookList)));
};
