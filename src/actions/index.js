
import axios from 'axios';

const ROOT_URL = 'http://localhost:3010';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const SELECT_BOOK = 'SELECT_BOOK';
export const SAVE_BOOK = 'SAVE_BOOK';
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';

export function fetchSubjects() {

    const request = axios.get(`${ROOT_URL}/subjects`);

    return {
        type: FETCH_SUBJECTS,
        payload: request
    };
}

export function fetchBooks(subject) {

    let payload;

    if (subject) {
        payload = axios.get(`${ROOT_URL}/books?subjects_like=${subject}`);
    } else {
        payload = { data: [] };
    }

    return {
        type: FETCH_BOOKS,
        payload: payload
    };
}

export function selectBook(id) {
    return {
        type: SELECT_BOOK,
        payload: id
    };
}

export function saveBook(book) {

    const request = axios.put(`${ROOT_URL}/books/${book.id}`, book);

    return {
        type: SAVE_BOOK,
        payload: request
    };
}
