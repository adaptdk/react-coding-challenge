import React, { Component } from "react";

export default class Books extends Component {
  selectBook = book => {
    this.props.getBookDetails(book);
  };
  render() {
    return (
      <div className="Books">
        <div className="columnTitle">Books</div>
        {this.props.books.map((book, index) => {
          return (
            <div
              className="BookListItem listItem"
              key={index}
              onClick={() => this.selectBook(index)}
            >
              {book.title}
            </div>
          );
        })}
      </div>
    );
  }
}
