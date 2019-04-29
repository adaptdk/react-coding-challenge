import * as ACTION_TYPES from './action_types';

export const requestSubject = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_SUBJECT_PENDING });
  fetch('http://localhost:3010/subjects')
    .then(response => response.json())
    .then(subjects => dispatch({
      type: ACTION_TYPES.REQUEST_SUBJECT_SUCCESS,
      payload: subjects
    }))
    .catch(err => dispatch({
      type: ACTION_TYPES.REQUEST_SUBJECT_FAILURE,
      payload: err
    }))
}

export const requestList = (url) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LIST_PENDING });
  fetch(url)
    .then(response => response.json())
    .then(list => dispatch({
      type: ACTION_TYPES.REQUEST_LIST_SUCCESS,
      payload: list
    }))
    .catch(err => dispatch({
      type: ACTION_TYPES.REQUEST_LIST_FAILURE,
      payload: err
    }))
}

export const requestBook = (url) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_BOOK_INFO_PENDING });
  fetch(url)
    .then(response => response.json())
    .then(book => dispatch({
      type: ACTION_TYPES.REQUEST_BOOK_INFO_SUCCESS,
      payload: book
    }))
    .catch(err => dispatch({
      type: ACTION_TYPES.REQUEST_BOOK_INFO_FAILURE,
      payload: err
    }))
}
