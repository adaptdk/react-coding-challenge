import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    book: null,
    books: [],
    error: false,
    subjects: []
  };

  subjectURL = "http://localhost:3010/subjects";
  booksURL = "http://localhost:3010/books?subjects_like=";
  bookURL = "http://localhost:3010/books/";

  getSubjects = async () => {
    await axios
      .get(this.subjectURL)
      .then(res => {
        this.setState({ subjects: res.data, error: false, book: null });
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  };

  getBooks = async subject => {
    await axios
      .get(this.booksURL + subject)
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

  handleTitleChange = e => {
    const newValue = e.target.value;
    this.setState(oldState => {
      return { book: { ...oldState.book, title: newValue } };
    });
  };

  handleAuthorChange = e => {
    const newValue = e.target.value;

    this.setState(oldState => {
      let newAuthors = [...oldState.book.authors];
      newAuthors[0].name = newValue;
      return {
        book: {
          ...oldState.book,
          authors: newAuthors
        }
      };
    });
  };

  handleBookshelfChange = (e, index) => {
    const newValue = e.target.value;

    this.setState(oldState => {
      let newBookshelves = [...oldState.book.bookshelves];
      newBookshelves[index] = newValue;

      return {
        book: {
          ...oldState.book,
          bookshelves: newBookshelves
        }
      };
    });
  };

  handleEdit = e => {
    e.preventDefault();
    const { book } = this.state;
    const data = {
      title: book.title,
      authors: book.authors,
      bookshelves: book.bookshelves
    };

    axios
      .patch(`${this.bookURL}${book.id}`, data)
      .then(() => {
        this.setState(oldState => {
          const index = oldState.books.findIndex(item => item.id === book.id);
          const books = [...oldState.books];
          books[index] = book;

          return { books };
        })
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  }

  renderSubjects = () => {
    const { subjects } = this.state;
    return (
      <div className="subject-wrapper">
        <h2>We have the following subjects:</h2>
        {subjects.map(subject => {
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
              onChange={this.handleTitleChange}
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
              onChange={this.handleAuthorChange}
            />
            <br />
          </label>
          <label className="label">
            Bookshelves:
            <br />
            {book.bookshelves.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    className="input"
                    type="text"
                    value={`${item}`}
                    name="bookshelves"
                    onChange={e => this.handleBookshelfChange(e, index)}
                  />
                  <br />
                </div>
              );
            })}
          </label>
          <button
            type="submit"
            onClick={this.handleEdit}
            className="button"
          >
            Submit changes
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
