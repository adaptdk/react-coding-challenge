import React, { Component } from "react";
import update from "immutability-helper";

export default class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  bookShelves = () => {
    const availableBookShelves = this.props.bookShelves;
    let selectedBookshelves = Object.entries(
      this.props.activeBook.bookshelves,
    ).map(bookshelve => {
      return bookshelve[1];
    });

    let bookShelves = Object.entries(availableBookShelves).map(
      (bookshelve, key) => {
        let checked = false;
        if (selectedBookshelves.includes(bookshelve[1])) {
          checked = true;
        } else {
          checked = false;
        }
        return (
          <div className="inputItem" key={key}>
            <label htmlFor={bookshelve[1]}>{bookshelve[1]}</label>
            <input
              readOnly
              type="checkbox"
              key={key}
              checked={checked}
              name={bookshelve[1]}
              value={this.state.checkbox}
              onChange={this.handleCheckboxChange}
            />
          </div>
        );
      },
    );

    return bookShelves;
  };

  render() {
    if (!this.props.bookSelected) {
      return (
        <div className="BookDetails">
          <div className="columnTitle">Book Details</div>
        </div>
      );
    } else {
      return (
        <div className="BookDetails">
          <div className="columnTitle">Book Details</div>
          <div className="bookForm">
            <div className="formRow">
              <label htmlFor="">Title</label>
              <input
                readOnly
                type="text"
                name="title"
                value={this.props.activeBook.title || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">ID</label>
              <input
                readOnly
                type="text"
                name="id"
                value={this.props.activeBook.id || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Downloads</label>
              <input
                readOnly
                type="text"
                name="download_count"
                disabled
                value={this.props.activeBook.download_count || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Bookshelves</label>
              <div className="inputList">{this.bookShelves()}</div>
            </div>

            <div className="formRow">
              <label htmlFor="">Media Type</label>
              <input
                readOnly
                type="text"
                name="media_type"
                disabled
                value={this.props.activeBook.media_type || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Langagues</label>
              <input
                readOnly
                type="text"
                name="languages"
                disabled
                value={this.props.activeBook.languages || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Formats</label>
              <div className="linkContainer">
                {Object.entries(this.props.activeBook.formats).map(
                  (format, key) => {
                    return (
                      <a target="_blank" href={format[1]} key={key}>
                        {format[0]}
                      </a>
                    );
                  },
                )}
              </div>
            </div>

            <div className="formRow">
              <label htmlFor="">Author</label>
              <div className="author">
                {Object.entries(this.props.activeBook.authors).map(
                  (author, key) => {
                    return (
                      <div className="author" key={key}>
                        <div className="formRow">
                          <label htmlFor="">Name: </label>
                          <input
                            readOnly
                            type="text"
                            className="name"
                            value={author[1].name}
                          />
                        </div>
                        <div className="formRow">
                          <label htmlFor="">Birth Year: </label>
                          <input
                            readOnly
                            type="text"
                            className="name"
                            value={author[1].birth_year}
                          />
                        </div>
                        <div className="formRow">
                          <label htmlFor="">Death Year: </label>
                          <input
                            readOnly
                            type="text"
                            className="name"
                            value={author[1].death_year}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
