import React, { Component } from "react";
import Subjects from "./Subjects";
import Books from "./Books";
import BookDetails from "./BookDetails";
import endpoint from "../util/endpoint";
import update from "immutability-helper";
import "../sass/App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookSelected: false,
      books: [],
    };
  }

  componentDidMount() {
    this.getBookShelves();
  }

  getBooks = subject => {
    let books = endpoint.getBooks(subject);
    books.then(books => {
      this.setState({
        books: books,
        activeBook: {},
        bookSelected: false,
      });
    });
  };

  getBookDetails = book => {
    this.setState({
      activeBook: this.state.books[book],
      bookSelected: true,
    });
  };

  getBookShelves = () => {
    let bookShelves = endpoint.getBookShelves();
    bookShelves.then(bookShelve => {
      this.setState({
        bookShelves: bookShelve.flat(),
      });
    });
  };

  updateActiveBook = evt => {
    if (evt.target.type === "checkbox") {
      this.setState({
        activeBook: update(this.state.activeBook, {
          bookshelves: {
            $push: [evt.target.name],
          },
        }),
      });
    } else {
      this.setState({
        activeBook: update(this.state.activeBook, {
          [evt.target.name]: {
            $set: evt.target.value,
          },
        }),
      });
    }
  };

  render() {
    return (
      <div className="appFrame">
        <Subjects searchBooks={this.getBooks} />
        <Books books={this.state.books} getBookDetails={this.getBookDetails} />
        <BookDetails
          bookSelected={this.state.bookSelected}
          activeBook={this.state.activeBook}
          saveBook={this.updateActiveBook}
          bookShelves={this.state.bookShelves}
        />
      </div>
    );
  }
}
