export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const SELECT_SUBJECT = 'SELECT_SUBJECT'
export const INVALIDATE_SUBJECT = 'INVALIDATE_SUBJECT'
export const SWITCH_EDIT_STATUS = 'SWITCH_EDIT_STATUS';
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

export const receiveBooks = (subject, json) => {
  return {
        type: RECEIVE_BOOKS,
        subject,
        books: subject?json.filter( (book) => (book.subjects.indexOf(subject) > -1)):json,
        receivedAt: Date.now()
    }
}

export const editBook = (id, title, author) => {
    return {
        type: EDIT_BOOK,
        id,
        title,
        author
    }
}

export const switchEditable = (bookId) => {
    return {
        type: SWITCH_EDIT_STATUS,
        id: bookId
    }
}

const fetchBooks = subject => dispatch => {
  dispatch(requestBooks(subject))
  return fetch(`http://localhost:3010/books`)
    .then(response => response.json())
    .then(json => dispatch(receiveBooks(subject, json)))
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
