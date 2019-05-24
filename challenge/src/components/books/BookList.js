import React, { Component } from 'react'
import BookListItem from 'components/books/BookListItem'
import PropTypes from 'prop-types'

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectedCategory: undefined,
      selectedItem: undefined
    }
  }

  componentDidMount() {
    this.fetchBookData();
  }

  fetchBookData() {
    let bookList = []
    fetch('http://localhost:3010/books')
      .then(response => response.json())
      .then(data => {
        for (const book of data) {
          bookList.push(book)
        }
        this.setState({ books: bookList })
      })
  }

  setSelectedItem(item) {
    this.props.setSelectedItem(item)
  }

  render() {
    let filteredItems = []
    const selectedCategory = this.props.selectedCategory
    for (const book of this.state.books) {
      if (book.subjects.includes(selectedCategory)) {
        filteredItems.push(<BookListItem key={book.id} book={book} setSelectedItem={this.setSelectedItem.bind(this)} />
        )
      }
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-8"><h3>Title</h3></div>
          <div className="col-sm-4"><h3>Authors</h3></div>
        </div>
        {filteredItems}
      </React.Fragment>
    );
  }
}

BookList.propTypes = {
  setSelectedBook: PropTypes.func
}

export default BookList