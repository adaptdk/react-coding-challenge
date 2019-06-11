import React, { Component } from "react";

export default class Books extends Component {
  render() {
    return (
      <div className="Books">
        <div className="columnTitle">Books</div>
        {this.props.books.map((book, index) => {
        })}
      </div>
    );
  }
}
