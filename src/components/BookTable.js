import React, {PropTypes} from 'react'
import Book from './Book'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress';

const BookList = ({books, editBook, fetching, fetched}) => {
    return(
        <div>
            {fetching && !fetched &&
            <div style={{marginTop: '35px'}}>
                <span style={{fontSize: '1.2em'}}>Loading books...</span><CircularProgress size={24} thickness={2} />
            </div>}
            {books && books.length > 0 &&
            <Table displayRowCheckbox={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Book</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books && books.length > 0 && books.map((b, i) => {
                        return <Book book={b} editBook={editBook} key={'book' + i}/>
                    })}
                </TableBody>
            </Table>}
        </div>
    )
}

BookList.propTypes = {
    books: PropTypes.array,
    editBook: PropTypes.func,
    fetching: PropTypes.bool,
    fetching: PropTypes.bool,
}

export default BookList
