import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Books = ({books, completeEdit, subjects}) => (
    <table>
        <thead>
            <tr>
                <th className="title">Title</th>
                <th>Authors</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {books.map((book) =>
            <Book key={book.id}
                  book={book}
                  subjects={subjects}
                  completeEdit={completeEdit}
            />
        )}
        </tbody>
    </table>
);

Books.propTypes = {
    books: PropTypes.array.isRequired,
    completeEdit: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
};

export default Books;
