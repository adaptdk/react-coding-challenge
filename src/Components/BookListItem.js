import React, { Component } from "react";

export default class BookListItem extends Component {
  render() {
    return <div className="BookListItem">{this.props.title}</div>;
  }
}
