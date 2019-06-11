import React, { Component } from "react";

export default class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      editedBook: {},
    };
  }

  handleChange = evt => {
    this.props.saveBook(evt);
  };

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
        }
        return (
          <div className="inputItem" key={key}>
            <label htmlFor={bookshelve[1]}>{bookshelve[1]}</label>
            <input
              type="checkbox"
              key={key}
              checked={checked}
              name={bookshelve[1]}
              value={this.state.checkbox}
              onChange={this.handleChange}
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
                type="text"
                name="title"
                value={
                  this.state.editedBook.title ||
                  this.props.activeBook.title ||
                  ""
                }
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">ID</label>
              <input
                type="text"
                name="id"
                value={
                  this.state.editedBook.id || this.props.activeBook.id || ""
                }
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Downloads</label>
              <input
                type="text"
                name="download_count"
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
                type="text"
                name="media_type"
                value={this.props.activeBook.media_type || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Langagues</label>
              <input
                type="text"
                name="languages"
                value={this.props.activeBook.languages || ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="formRow">
              <label htmlFor="">Formats</label>
              <div className="formContainer">
                {Object.entries(this.props.activeBook.formats).map(
                  (format, key) => {
                    return (
                      <div className="formatRow" key={key}>
                        <input
                          type="text"
                          value={format[0]}
                          onChange={this.handleChange}
                        />
                        <input
                          type="text"
                          value={format[1]}
                          onChange={this.handleChange}
                        />
                      </div>
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
                            type="text"
                            className="name"
                            value={author[1].name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="formRow">
                          <label htmlFor="">Birth Year: </label>
                          <input
                            type="text"
                            className="name"
                            value={author[1].birth_year}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="formRow">
                          <label htmlFor="">Death Year: </label>
                          <input
                            type="text"
                            className="name"
                            value={author[1].death_year}
                            onChange={this.handleChange}
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
