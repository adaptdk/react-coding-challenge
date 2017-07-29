import React, {PropTypes} from "react"
import { connect } from 'react-redux'
import * as types  from '../types'
import Subjects from './Subjects'
import BookTable from './BookTable'
import BookModal from './BookModal'
import {updateBook, createBook} from '../api'
import {bookFormatToForm} from '../helpers/bookFormat'
import FlatButton from 'material-ui/FlatButton'

class Home extends React.Component {
  componentWillMount() {
    this.props.subjectsGet()
  }
  render() {
    const {bookForm : {book, type}} = this.props
    const bookFormProps = {
      initialValues: book,
      method: type && type === 'edit' ? updateBook : createBook,
      onSubmitSuccess: this.props.onSubmitSuccess,
      type
    }
    return (
      <div className="page-home">
        <div>
          <div className="left">
            <Subjects {...this.props.subjects} select={this.props.booksGetBySubject}/>
          </div>
          <div className="left add">
            <FlatButton
              label="Create Book"
              labelPosition="before"
              icon={<i className="material-icons">add</i>}
              onTouchTap={() => this.props.bookFormCreate()}
              style={{
                marginTop: '27px',
                marginLeft: '15px',
                border: '1px solid #b2b2b2',
                borderRadius: '8px'
              }}
            />
          </div>
          <div className="clear"></div>
        </div>
        <BookTable {...this.props.books} editBook={this.props.bookFormEdit}/>
        <BookModal {...this.props.bookForm}
        close={this.props.bookFormClose}
        bookFormProps={bookFormProps}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects,
    books: state.books,
    bookForm: state.bookForm,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subjectsGet: () => dispatch({type: types.SUBJECTS_FETCH}),
    booksGetBySubject: (subject) => dispatch({type: types.BOOKS_FETCH_BY_SUBJECT, subject}),
    bookFormEdit: (book) => dispatch({type: types.BOOKFORM_EDIT, book: bookFormatToForm(book)}),
    bookFormCreate: () => dispatch({type: types.BOOKFORM_CREATE}),
    bookFormClose: () => dispatch({type: types.BOOKFORM_CLOSE}),
    onSubmitSuccess: () => dispatch({type: types.BOOKFORM_SUCCESS})
  }
}

Home.propTypes = {
  subject: PropTypes.object,
  books: PropTypes.object,
  bookForm: PropTypes.object,
  subjectsGet: PropTypes.func,
  booksGetBySubject: PropTypes.func,
  bookFormEdit: PropTypes.func,
  bookFormCreate: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)