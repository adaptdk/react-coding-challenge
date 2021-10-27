import axios from 'axios';

async function fetchSubjects() {
  const { data: subjects } = await axios.get('http://localhost:3010/subjects');

  return subjects;
}

async function fetchBooksBySubject(subject) {
  const { data: books } = await axios.get(`http://localhost:3010/books?subjects_like=${subject}`);

  return books;
}

async function saveBook(book) {
  const { data: updatedBook } = await axios.patch(`http://localhost:3010/books/${book.id}`, book);

  return updatedBook;
}

export { fetchSubjects, fetchBooksBySubject, saveBook };
