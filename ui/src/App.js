import React from 'react';
import axios from "axios";

class App extends React.Component {
  state = {
    book: null,
    books: [],
    error: false,
    subjects: []
  };

  subjectURL = "http://localhost:3010/subjects";
  bookURL = "http://localhost:3010/books?subjects_like=";

  getSubjects = () => {
    axios
      .get(this.subjectURL)
      .then(res => {
        this.setState({ subjects: res.data, error: false, book: null });
        console.log("State", this.state);
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  };

  getBooks = subject => {
    axios
      .get(this.bookURL + subject)
      .then(res => {
        this.setState({ books: res.data, error: false, book: null });
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  };

  handleSubjectClick = e => {
    this.getBooks(e.target.id);
  };

  handleBookClick = e => {
    const id = ~~e.target.id;
    let book = this.state.books.filter(item => item.id === id);
    book = book[0];
    this.setState({ book, error: false });
  };

  //Function created just be able to use 'value' filed in inputs
  //Otherwise, console errors were thrown
  handleChange = () => {
    return
  };

  renderSubjects = () => {
    return (
      <div className="subject-wrapper">
        <h2>We have the following subjects:</h2>
        {this.state.subjects.map(subject => {
          return (
            <span
              className="subject"
              id={subject}
              key={subject}
              onClick={this.handleSubjectClick}
            >
              {subject}
            </span>
          );
        })}
      </div>
    );
  };

  renderBooks = () => {
    const { books } = this.state;
    return (
      <div className="books-wrapper">
        <hr />
        <h2>We have the following books for this subject:</h2>
        {books.map(book => {
          return (
            <div
              className="book"
              id={book.id}
              key={book.id}
              onClick={this.handleBookClick}
            >
              {book.title}
            </div>
          );
        })}
      </div>
    );
  };

  renderBook = () => {
    const { book } = this.state;
    console.log(book);
    return (
      <div className="book-wrapper">
        <h2>We have the following details about {book.title}</h2>
        <form>
          <label className="label">
            Title:
            <br />
            <textarea
              className="textarea"
              value={`${book.title}`}
              name="title"
              onChange={this.handleChange}
            />
            <br />
          </label>
          <label className="label">
            Author:
            <br />
            <input
              className="input"
              type="text"
              name="authors"
              value={`${book.authors[0].name}`}
              onChange={this.handleChange}
            />
            <br />
          </label>
          <label className="label">
            Bookshelves:
            <br />
            {book.bookshelves.map(item => {
              return (
                <div key={`${item}`}>
                  <input
                    className="input"
                    type="text"
                    value={`${item}`}
                    name="bookshelves"
                    onChange={this.handleChange}
                  />
                  <br />
                </div>
              );
            })}
          </label>
          <button type="submit">
            Edit
          </button>
        </form>
      </div>
    );
  };

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    const { error, book, books } = this.state;
    return (
      <div className="container">
        {error && <h3 className="error">{error}</h3>}
        {!error && this.renderSubjects()}
        {!error && books.length > 1 && this.renderBooks()}
        {!error && !!book && this.renderBook()}
      </div>
    );
  }
}

export default App;
