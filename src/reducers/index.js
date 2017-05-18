import { combineReducers } from 'redux'
import {
  SELECT_SUBJECT, INVALIDATE_SUBJECT,
  REQUEST_BOOKS, RECEIVE_BOOKS,
  SWITCH_EDIT_STATUS, EDIT_BOOK,
} from '../actions'

const selectedSubject = (state = '', action) => {
  switch (action.type) {
    case SELECT_SUBJECT:
      return action.subject
    default:
      return state
  }
}

const books = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBJECT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_BOOKS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_BOOKS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.books,
        lastUpdated: action.receivedAt
      }
    case EDIT_BOOK:
      return state.map((book) => {
        if (book.id == action.id) {
          book.title = action.title;
          book.author = action.author;
        }
        return book;
      });
    case SWITCH_EDIT_STATUS:
      return state.map(book => {
        if (book.id == action.id) {
          book.editable = !book.editable;
        }
        return book;
      })
    default:
      return state
  }
}

const booksBySubject = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBJECT:
    case RECEIVE_BOOKS:
    case REQUEST_BOOKS:
      return {
        ...state,
        [action.subject]: books(state[action.subject], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  booksBySubject,
  selectedSubject
})

export default rootReducer
