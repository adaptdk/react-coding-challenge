import React, { PropTypes, Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import { ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { get } from './fetch-utils';
import { RoutesRenderer } from './route-utils';
import { 
  BOOKS_API_PATH, 
  BOOK_DETAIL_ROUTE_PATH, 
} from './constants';

const bookPath = pathToRegexp.compile(BOOKS_API_PATH);
const bookDetailPath = pathToRegexp.compile(BOOK_DETAIL_ROUTE_PATH);

const defaultState = {
  books: [
    {
      id: null,
      authors: [],
      bookshelves: [],
      download_count: null,
      formats: {},
      languages: [],
      media_type: null,
      subjects:[],
      title: null,
    },
  ],
};

export class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  componentDidMount() {
    const { subject } = this.props;
    this.fetchBooks(subject);
  }

  fetchBooks(bookId) {
    get(bookPath({id: bookId})).then((res) => {
      this.setState({ ...{ books: res } });
    });
  }

  render() {
    const { subject } = this.props;
    const { books } = this.state;

    return (
      <Col>
        <Row className="sub-content">
          <ListGroup>
            {books.map((book, idx) => {
              const bookId = book.id || '#';
              return (
                <LinkContainer 
                  key={idx} 
                  to={bookDetailPath({ subject: subject, id: bookId })}
                >
                  <ListGroupItem>{book.title}</ListGroupItem>
                </LinkContainer>
              );
            })}
          </ListGroup>
        </Row>
      </Col>
    );
  }
}

Book.propTypes = {
  subject: PropTypes.string.isRequired,
};

export default Book;
