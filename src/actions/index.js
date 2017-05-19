export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const REQUEST_SUBJECTS = 'REQUEST_SUBJECTS'
export const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS'
export const SELECT_SUBJECT = 'SELECT_SUBJECT'
export const INVALIDATE_SUBJECT = 'INVALIDATE_SUBJECT'
export const EDIT_BOOK = "EDIT_BOOK";

export const selectSubject = subject => ({
  type: SELECT_SUBJECT,
  subject
})

export const invalidateSubject = subject => ({
  type: INVALIDATE_SUBJECT,
  subject
})

export const requestBooks = subject => ({
  type: REQUEST_BOOKS,
  subject
})

export const requestSubjects = () => ({type: REQUEST_SUBJECTS})

export const receiveBooks = (subject, json) => {
  return {
        type: RECEIVE_BOOKS,
        subject,
        books: json,
        receivedAt: Date.now()
    }
}
export const receiveSubjects = (json) => {
  return {
        type: RECEIVE_SUBJECTS,
        subjects: json,
    }
}

export const editBook = (id, title) => {
    return {
        type: EDIT_BOOK,
        id,
        title,
    }
}

export const fetchSubjects = subject => dispatch => {
  dispatch(requestSubjects())
  return fetch(`http://localhost:3010/subjects`)
    .then(response => response.json())
    .then(json => dispatch(receiveSubjects(json)))
}

export const fetchBooks = subject => dispatch => {
  dispatch(requestBooks(subject))
  return fetch(`http://localhost:3010/books?subjects_like=${subject}`)
    .then(response => response.json())
    .then(json => dispatch(receiveBooks(subject, json)))
    .catch((e)=> {console.log(e)})
}

const shouldFetchBooks = (state, subject) => {
  const books = state.booksBySubject[subject]
  if (!books) {
    return true
  }
  if (books.isFetching) {
    return false
  }
  return books.didInvalidate
}

export const fetchBooksIfNeeded = subject => (dispatch, getState) => {
  if (shouldFetchBooks(getState(), subject)) {
    return dispatch(fetchBooks(subject))
  }
}
