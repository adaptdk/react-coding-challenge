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

  onDetailsChange() {
    // Update component if books details info was changed
    const { subject } = this.props;
    this.fetchBooks(subject);
  }

  render() {
    const { routes, subject } = this.props;
    const { books } = this.state;
    const onDetailsChange = this.onDetailsChange.bind(this);

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
        <Row className="sub-content">
          {routes.map((route, i) => {
            return (
              <RoutesRenderer 
                key={i} 
                {...{ ...route, context: {subject, onDetailsChange} }}
              />
            );
          })}
        </Row>
      </Col>
    );
  }
}

Book.propTypes = {
  subject: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Book;
