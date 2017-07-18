import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as booksActions from '../../actions/booksActions';

import BooksListing from '../../components/BooksListing';

import BookItemEditingForm from '../../components/BookItemEditingForm';

class BookSelectionPage extends React.Component {

  constructor() {
    super();
    this.handleBookItemSelection = this.handleBookItemSelection.bind(this);
    this.handleBookEditingFormFieldChange = this.handleBookEditingFormFieldChange.bind(this);
  }

  componentDidMount() {
    const {
      actions: { fetchBookList },
      params: { bookSubject }
    } = this.props;
    fetchBookList(bookSubject);
  }

  handleBookItemSelection(bookId) {
    const {
      actions: { setSelectedBook }
    } = this.props;
    const selectedBookItem = this.props.bookList.find(bookItem => bookItem.id === bookId);
    setSelectedBook(selectedBookItem);
  }

  handleBookEditingFormFieldChange(fieldName, fieldValue) {
    this.props.actions.setBookItemFormField(fieldName, fieldValue);
  }

  render() {

    const { bookList, uiState } = this.props;

    return (
      <div className="book-selection-page row">
        <h2 className="text-center">Select a book (left pane) and edit its properties (right pane)</h2>
        <div className="book-browsing-pane col-xs-4">
          <BooksListing
            bookList={bookList}
            onBookItemClick={this.handleBookItemSelection}
            selectedBookId={uiState.bookItem.id}
          />
        </div>
        <div className="book-editing-pane col-xs-8">
          <BookItemEditingForm
            bookItem={uiState.bookItem}
            onFieldChange={this.handleBookEditingFormFieldChange}
          />
        </div>
      </div>
    );
  }
}

BookSelectionPage.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectedBookItem: PropTypes.object,
  params: PropTypes.shape({
    bookSubject: PropTypes.string.isRequired
  }),
  uiState: PropTypes.object,
  actions: PropTypes.shape({
    fetchBookList: PropTypes.func.isRequired,
    setSelectedBook: PropTypes.func.isRequired,
    setBookItemFormField: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ mainRd }) {
  return {
    bookList: mainRd.bookList,
    selectedBookItem: mainRd.selectedBookItem,
    uiState: mainRd.uiState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(booksActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(BookSelectionPage)
);
