import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'react-bootstrap';

import PropTypeShapes from '../../propTypes';

import './BookListing.scss';

class BooksListing extends React.Component {

  constructor() {
    super();
    this._handleBookItemClick = this._handleBookItemClick.bind(this);
  }

  _handleBookItemClick(bookItemId) {
    this.props.onBookItemClick(bookItemId);
  }

  render() {

    const {
      bookList,
      selectedBookId
    } = this.props;

    return (
      <Col className="book-listing" xs={12}>
        {bookList.map((bookItem, bookItemIndex) => {
          const isBookItemActive = bookItem.id === selectedBookId;
          return (
            <Col
              xs={12}
              key={bookItemIndex}
              className={`book-item col-xs-12 ${isBookItemActive ? 'state--active' : ''}`}
              onClick={() => { this._handleBookItemClick(bookItem.id); }}
            >
              <Row>
                <Col className="book-item-left-pane" xs={6}>
                  <h3>{bookItem.title}</h3>
                  <h4>{bookItem.description}</h4>
                </Col>
                <Col className="book-item-right-pane" xs={6}>
                  <h4>
                    Downloaded <strong>{bookItem.download_count}</strong> times
                  </h4>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Col>
    );
  }
}

BooksListing.propTypes = {
  selectedBookId: PropTypes.number,
  bookList: PropTypes.arrayOf(
    PropTypeShapes.bookItemShape
  ).isRequired,
  onBookItemClick: PropTypes.func.isRequired
};

export default BooksListing;
