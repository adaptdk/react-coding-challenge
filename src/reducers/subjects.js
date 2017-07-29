import * as types from '../types'

const defaultSate = {
    subjects: [],
    fetching: false,
    fetched: false,
    value: '',
}

export default function subjectsReducer(state = defaultSate, action) {
    switch(action.type) {
        case types.SUBJECTS_FETCH: {
            return {...state, fetching: true, fetched: false}
        }
        case types.SUBJECTS_SAVE: {
            return {...state, subjects: action.subjects, fetching: false, fetched: true}
        }
        case types.BOOKS_FETCH_BY_SUBJECT: {
            return {...state, value: action.subject}
        }
        case types.BOOKFORM_SUCCESS: {
            return {...state, value: ''}
        }
        default: return state
    }
}