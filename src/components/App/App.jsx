import React, { useEffect, useState } from 'react';

import Subject from '../Subject';
import List from '../List';
import Form from '../Form';

import {
  API_URL,
  BOOKS_ENDPOINT,
  SEARCH_PARAMS,
  SUBJECT_ENDPOINT,
  SUBJECT_PLACEHOLDER,
} from '../../../project.config';

import './App.scss';

const App = () => {
  const [subjects, setSubjects] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [books, setBooks] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const handleSubject = (event) => {
    setActiveSubject(event.target.value);
  };

  const handleBook = (book) => {
    setActiveBook(book);
  };

  const handleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  useEffect(() => {
    fetch(`${API_URL}/${SUBJECT_ENDPOINT}`)
      .then(response => response.json())
      .then(data => setSubjects(data));
  }, []);

  useEffect(() => {
    if (activeSubject !== null) {
      fetch(`${API_URL}/${BOOKS_ENDPOINT}?${SEARCH_PARAMS}=${activeSubject}`)
        .then(response => response.json())
        .then((data) => {
          setBooks(data);
          setActiveBook(null);
        });
    }
  }, [activeSubject, toggleUpdate]);

  return (
    <div className="container">
      <Subject subjects={subjects} handleSubject={handleSubject} />
      {activeSubject
        && activeSubject !== SUBJECT_PLACEHOLDER
        && books
        && <List books={books} handleBook={handleBook} />
      }
      {activeBook && (
        <Form
          key={activeBook.id}
          book={activeBook}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default App;
