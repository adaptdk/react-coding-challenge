import React, { useState, useEffect } from "react";

import Select from "./Select";
import Card from "./Card";
import BookInfoForm from "./BookInfoForm";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    getAllSubjects();
  }, []);

  const getAllSubjects = () => {
    fetch("http://localhost:3001/subjects")
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      });
  };

  const getAllBooksBySubject = (subject) => {
    fetch(`http://localhost:3001/books?subjects_like=${subject}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  };

  const getBookById = (id) => {
    fetch(`http://localhost:3001/books?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentBook(data[0]);
      });
  };

  const updateCurrentBook = function () {
    fetch(`http://localhost:3001/books/${currentBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentBook),
    }).then((response) => response.json());
  };

  const handleCategorySelect = function (e) {
    getAllBooksBySubject(e.target.value);
    setCurrentBook({});
  };

  const handleBookSelect = function (e) {
    getBookById(e.target.value);
  };

  return (
    <div className="App">
      <Card header="Step 1: Choose a category">
        <Select onSelect={handleCategorySelect}>
          {subjects.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Card>

      {books.length > 0 && (
        <Card header="Step 2: Choose a book">
          <Select onSelect={handleBookSelect}>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </Select>
        </Card>
      )}

      {books.length > 0 && Object.keys(currentBook).length > 0 && (
        <Card header="Step 3: Edit the book">
          <BookInfoForm
            subjects={subjects}
            currentBook={currentBook}
            getBookById={getBookById}
            setCurrentBook={setCurrentBook}
            updateCurrentBook={updateCurrentBook}
          />
        </Card>
      )}
    </div>
  );
}

export default App;
