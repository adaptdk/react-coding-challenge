import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  isPendingSubject: false,
  subjects: [],
  errorSubject: '',
  isListChosen: false,
  isPendingList: false,
  list: [],
  errorList: '',
  isBookChosen: false,
  isPendingBook: false,
  bookInfo: [],
  errorBook: ''
}

const requestSubject = (state=initialState, action={}) => {
  switch(action.type) {
    case ACTION_TYPES.REQUEST_SUBJECT_PENDING:
      return Object.assign({}, state, { isPendingSubject: true });
    case ACTION_TYPES.REQUEST_SUBJECT_SUCCESS:
      return Object.assign({}, state, { isPendingSubject: false, subjects: action.payload });
    case ACTION_TYPES.REQUEST_SUBJECT_FAILURE:
      return Object.assign({}, state, { isPendingSubject: false, errorSubject: action.payload });
    case ACTION_TYPES.REQUEST_LIST_PENDING:
      return Object.assign({}, state, { isPendingList: true });
    case ACTION_TYPES.REQUEST_LIST_SUCCESS:
      return Object.assign({}, state, { isListChosen: true, isPendingList: false, list: action.payload, errorList: '', isBookChosen: false, });
    case ACTION_TYPES.REQUEST_LIST_FAILURE:
      return Object.assign({}, state, { isPendingList: false, errorList: action.payload });
    case ACTION_TYPES.REQUEST_BOOK_INFO_PENDING:
      return Object.assign({}, state, { isBookChosen: false, isPendingBook: true });
    case ACTION_TYPES.REQUEST_BOOK_INFO_SUCCESS:
      return Object.assign({}, state, { isBookChosen: true, isPendingBook: false, bookInfo: action.payload, errorBook: '' });
    case ACTION_TYPES.REQUEST_BOOK_INFO_FAILURE:
      return Object.assign({}, state, { isPendingBook: false, errorBook: action.payload });
    default:
      return state;
  }
}

export default requestSubject;
