import * as types from '../types'

const defaultSate = {
    books: [],
    fetching: false,
    fetched: false,
}

export default function booksReducer(state = defaultSate, action) {
    switch(action.type) {
        case types.BOOKS_FETCH_BY_SUBJECT: {
            return {...state, fetching: true, fetched: false}
        }
        case types.BOOKS_SAVE: {
            return {...state, fetching: false, fetched: true, books: action.books}
        }
        case types.BOOKFORM_SUCCESS: {
            return {...state, books: []}
        }
        default: return state
    }
}