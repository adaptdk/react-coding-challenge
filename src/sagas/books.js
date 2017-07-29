import { call, put } from 'redux-saga/effects'
import * as types from '../types'
import { getSubjects, getBooksBySubject } from '../api'

export function* fetchSubjectList(action) {
    const subjects = yield call(getSubjects)
    yield put({
        type: types.SUBJECTS_SAVE,
        subjects: subjects.data
    })
}

export function* fetchBooksBySubject(action) {
    const books = yield call(getBooksBySubject, action.subject)
    yield put({
        type: types.BOOKS_SAVE,
        books: books.data
    })
}