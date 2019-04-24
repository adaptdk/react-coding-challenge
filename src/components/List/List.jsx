import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

import './List.scss';

const List = ({ books, handleBook }) => (
  <section className="section">
    {books && (
      <Fragment>
        <h2 className="section__heading">Books</h2>
        {books.map(book => (
          <ListItem
            key={book.id}
            title={book.title}
            onClick={() => handleBook(book)}
          />
        ))}
      </Fragment>
    )}
  </section>
);

List.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleBook: PropTypes.func.isRequired,
};

export default List;
