import React from 'react';

const Book = ({id, title, author, onDoubleClick}) => (
    <tr onDoubleClick={onDoubleClick}>
            <td>{title}</td>
            <td>{author}</td>
    </tr>
)

export default Book
