import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { destroy as destroyForm } from 'redux-form'
import { selectBook } from '../../redux/modules/books';

class BooksList extends Component {
  static propTypes = {
    selectBook: PropTypes.func,
    destroyForm: PropTypes.func,
    selectedSubjects: PropTypes.array,
    selectedBook: PropTypes.object,
    books: PropTypes.array,
  };

  static defaultProps = {
    selectedSubjects: [],
    books: [],
    selectedBook: {},
  };

  handleBookSelect = (e) => {
    const { books, selectBook, destroyForm } = this.props;
    destroyForm();
    const bookdId = Number(e.target.dataset.bookId);
    selectBook(books.find((book) => (book.id === bookdId)));
  };

  render() {
    const { selectedSubjects, books, selectedBook } = this.props;
    return (
      selectedSubjects.length ?
        <Panel header="Select book">
          <ListGroup className="BooksList">
            {
              books.map((book) => (
                <ListGroupItem
                  key={book.id}
                  href={`#${book.id}`}
                  data-book-id={book.id}
                  onClick={this.handleBookSelect}
                  active={selectedBook.id === book.id}
                >
                  {book.title}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Panel> : null
    );
  };
}

const mapStateToProps = ({ subjects, books }) => ({
  selectedSubjects: subjects.selected,
  selectedBook: books.selected,
  books: books.all,
});

const mapDispatchToProps = (dispatch) => ({
  selectBook: (book) => {
    dispatch(selectBook(book));
  },
  destroyForm: () => {
    dispatch(destroyForm('bookEditForm'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);
