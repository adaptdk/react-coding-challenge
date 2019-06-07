import React, { Component } from "react";
import Subjects from "./Subjects";
import Books from "./Books";
import BookDetails from "./BookDetails";
import endpoint from "../util/endpoint";
import "../sass/App.scss";

export default class App extends Component {
  getBooks = subject => {
    console.log(`trying to get books for ${subject}`);
  };
  render() {
    return (
      <div className="appFrame">
        <Subjects searchBooks={this.getBooks} />
        <Books />
        <BookDetails />
      </div>
    );
  }
}
