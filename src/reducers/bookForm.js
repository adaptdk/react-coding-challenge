import * as types from '../types'

const defaultState = {
    book: {
        id: '',
        authors: [],
        bookshelves: [],
        download_count: 0,
        formats: [],
        languages: [],
        media_type: '',
        subjects: [],
        title: '',
    },
    show: false,
    type: ''
}

export default function bookFormReducer(state = defaultState, action) {
    switch(action.type) {
        case types.BOOKFORM_CREATE: {
            return {...state, book: defaultState.book, show: true, type: 'create'}
        }
        case types.BOOKFORM_EDIT: {
            return {...state, book: {...action.book}, show: true, type: 'edit'}
        }
        case types.BOOKFORM_CLOSE:
        case types.BOOKFORM_SUCCESS: {
            return {...state, show: false}
        }
        default: return state
    }
}