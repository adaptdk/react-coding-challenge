import {combineReducers} from 'redux';
import {
    SELECT_SUBJECT, INVALIDATE_SUBJECT,
    REQUEST_BOOKS, RECEIVE_BOOKS,
    RECEIVE_SUBJECTS, REQUEST_SUBJECTS,
} from '../actions';

const selectedSubject = (state = [], action) => {
    switch (action.type) {
    case SELECT_SUBJECT:
        return action.subject;
    default:
        return state;
    }
};

const books = (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) => {
    switch (action.type) {
    case INVALIDATE_SUBJECT:
        return {
            ...state,
            didInvalidate: true,
        };
    case REQUEST_BOOKS:
        return {
            ...state,
            isFetching: true,
            didInvalidate: false,
        };
    case RECEIVE_BOOKS:
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            items: action.books,
        };
    default:
        return state;
    }
};

const booksBySubject = (state = {}, action) => {
    switch (action.type) {
    case INVALIDATE_SUBJECT:
    case RECEIVE_BOOKS:
    case REQUEST_BOOKS:
        return {
            ...state,
            [action.subject]: books(state[action.subject], action)
        };
    default:
        return state;
    }
};

const subjects = (state = {subjects: []}, action) => {
    switch (action.type) {
    case RECEIVE_SUBJECTS:
    case REQUEST_SUBJECTS:
        return {
            ...state,
            subjects: action.subjects
        };
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    booksBySubject,
    selectedSubject,
    books,
    subjects,
});

export default rootReducer;
