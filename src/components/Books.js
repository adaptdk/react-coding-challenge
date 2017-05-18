import React from 'react'
import PropTypes from 'prop-types'
import EditableBook from './EditableBook'

const Books = ({books, onClick, completeEdit}) => (
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Authors</th>
        </tr>
        </thead>
        <tbody>
        {books.map((book, i) =>
            <tr key={i} >
                <td onClick={onClick}>
                    {book.editable ?
                    <EditableBook
                        key={book.id}
                        {...book}
                        isActive
                        onCancel={() => onClick(book.id)}
                        onComplete={(title, author) => completeEdit(book.id, title, author)}
                        onClick={() => onClick(book.id)}
                    />
                        :
                        book.title}
                </td>
                <td>{book.authors.map((item) => item.name)}</td>
            </tr>
        )}
        </tbody>
    </table>
);


Books.propTypes = {
    books: PropTypes.array.isRequired
}


export default Books
