export const BASE_API_URL = 'http://127.0.0.1:3010';
export const SUBJECTS_API_PATH = '/subjects';
export const BOOKS_API_PATH = '/books?subjects_like=:id';
export const BOOK_DETAIL_API_PATH = '/books?subjects_like=:subject&id=:id';
export const BOOK_DETAIL_UPDATE_API_PATH = '/books/:id';
export const BOOK_DELETE_API_PATH = BOOK_DETAIL_UPDATE_API_PATH;
export const BOOK_DETAIL_CREATE_API_PATH = '/books';

export const BOOK_DETAIL_ROUTE_PATH = '/books/:subject/:id';
export const BOOKS_ROUTE_PATH = '/books';
