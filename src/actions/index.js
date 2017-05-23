export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const REQUEST_SUBJECTS = 'REQUEST_SUBJECTS'
export const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS'
export const SELECT_SUBJECT = 'SELECT_SUBJECT'
export const INVALIDATE_SUBJECT = 'INVALIDATE_SUBJECT'
export const EDIT_BOOK = "EDIT_BOOK";
export const ADD_BOOK = "ADD_BOOK";
export const BOOK_UPDATED = "BOOK_UPDATED";

export const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

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


export function addBook(game) {
    return {
        type: ADD_BOOK,
        game
    }
}
export function bookUpdated(game) {
    return {
        type: BOOK_UPDATED,
        game
    }
}


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
        .catch((e) => {
            console.log(e)
        })
}

export const saveGame = data => dispatch => {
    return fetch('http://localhost:3010/books', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(handleResponse)
        .then(data => dispatch(addBook(data.game)));
}

export const editBook = (data, selectedSubject) => dispatch => {
    return fetch(`http://localhost:3010/books/${data.id}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(handleResponse)
        .then(data => {
            dispatch(bookUpdated(data));
            dispatch(fetchBooks(selectedSubject));
        });
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
