import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function mainRd(state = initialState, action) {

  switch (action.type) {

    case actionTypes.FETCH_BOOK_LIST_SUCCESS: {
      return {
        ...state,
        bookList: action.bookList
      };
    }

    case actionTypes.FETCH_SUBJECT_LIST_SUCCESS: {
      return {
        ...state,
        subjectList: action.subjectList
      };
    }

    case actionTypes.SUBJECT_SELECTED: {
      return {
        ...state,
        selectedSubject: action.selectedSubject
      };
    }

    case actionTypes.BOOK_SELECTED: {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          bookItem: action.selectedBookItem
        }
      };
    }

    case actionTypes.BOOK_ITEM_FORM_FIELD_CHANGE: {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          bookItem: {
            ...state.uiState.bookItem,
            [action.fieldName]: action.fieldValue
          }
        }
      };
    }

    default:
      return state;

  }
}

