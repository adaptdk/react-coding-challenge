import React, { Component } from "react";
import Subjects from "./Subjects";
import Books from "./Books";
import BookDetails from "./BookDetails";
import endpoint from "../util/endpoint";
import "../sass/App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  getBooks = subject => {
    let books = endpoint.getBooks(subject);
    books.then(books => {
      this.setState({
        books: books,
      });
    });
  };
  render() {
    return (
      <div className="appFrame">
        <Subjects searchBooks={this.getBooks} />
        <Books books={this.state.books} />
      </div>
    );
  }
}
