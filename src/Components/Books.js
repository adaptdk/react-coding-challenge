import React, { Component } from "react";
import BookListItem from "./BookListItem";

export default class Books extends Component {
  render() {
    return (
      <div className="Books">
        <div className="columnTitle">Books</div>
        {this.props.books.map((book, index) => {
          return <BookListItem key={index} title={book.title} />;
        })}
      </div>
    );
  }
}
