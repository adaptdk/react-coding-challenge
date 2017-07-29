import axios from 'axios'
axios.defaults.headers.common['Content-Type'] = 'application/json'
import {bookFormatToSubmit} from '../helpers/bookFormat'

export function getSubjects() {
    return axios.get('http://localhost:3010/subjects')
}

export function getBooksBySubject(subject) {
    return axios.get(`http://localhost:3010/books?subjects_like=${subject}`)
}

export function updateBook(book) {
    const newBook = bookFormatToSubmit(book)
    return axios.put(`http://localhost:3010/books/${book.id}`, {...newBook})
}

export function createBook(book) {
    const newBook = bookFormatToSubmit(book)
    return axios.post(`http://localhost:3010/books`, {...newBook})
}