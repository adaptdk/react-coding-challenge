import React, {PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'

const style = {
  margin: 12,
};

const Book = ({book, editBook}) => {
    return(
        <TableRow>
            <TableRowColumn><strong>{book.title}</strong></TableRowColumn>
            <TableRowColumn>
                <RaisedButton
                    label="Edit"
                    labelPosition="before"
                    primary={true}
                    icon={<i className="material-icons">mode_edit</i>}
                    style={style}
                    onTouchTap={() => { editBook(book) }}
                />
            </TableRowColumn>
        </TableRow>
    )
}

Book.propTypes = {
    book: PropTypes.object,
    editBook: PropTypes.func,
}

export default Book
