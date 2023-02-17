import { defineStore } from "pinia";
import axios from 'axios';

export const MainStore = defineStore("MainStore", {
    state: () => ({ subjects: [], books: [] }),
    getters: {
        findIndex: state => bookId => state.books.findIndex(book => book.id === bookId)
    },
    actions: {
        async getSubjects() {
            try {
                const response = await axios.get('http://localhost:3010/subjects');
                this.subjects = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getBooks() {
            try {
                const response = await axios.get('http://localhost:3010/books');
                this.books = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        updateBook(editedBook) {
            const index = this.findIndex(editedBook.id);
            this.books.splice(index, 1, editedBook);
        }
    },
})