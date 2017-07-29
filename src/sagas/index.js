import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import * as books from './books'
import * as types from '../types'

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, types.SUBJECTS_FETCH, books.fetchSubjectList),
    fork(takeLatest, types.BOOKS_FETCH_BY_SUBJECT, books.fetchBooksBySubject),
    fork(takeLatest, types.BOOKFORM_SUCCESS, books.fetchSubjectList),
  ]
}
