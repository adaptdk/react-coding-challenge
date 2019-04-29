import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Subject from './Subject';
import Book from './Book';
import './App.css';

import { requestSubject, requestList, requestBook } from '../store/actions/actions';

class App extends Component {

  componentDidMount() {
    this.props.onSubjectRequest();
  }

  render() {

    const { isPendingSubject, errorSubject, isListChosen, errorList, isBookChosen, errorBook } = this.props;

    return (
      <div>
        <div>
          { isPendingSubject
            ? <h3>Connecting to database...</h3>
            : errorSubject !== ''
              ? <h3>Error connecting to database</h3>
              : <Subject { ...this.props } />
            }
        </div>
        <div>
          { errorList !== ''
            ? <h3>Error connecting to database</h3>
            : isListChosen && <List { ...this.props } /> }
        </div>
        <div>
          { errorBook !== ''
            ? <h3>Error connecting to database</h3>
            : isBookChosen && <Book { ...this.props} /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPendingSubject: state.bookDatabaseReducer.isPendingSubject,
    subjects: state.bookDatabaseReducer.subjects,
    errorSubject: state.bookDatabaseReducer.errorSubject,
    isListChosen: state.bookDatabaseReducer.isListChosen,
    isPendingList: state.bookDatabaseReducer.isPendingList,
    list: state.bookDatabaseReducer.list,
    errorList: state.bookDatabaseReducer.errorList,
    isBookChosen: state.bookDatabaseReducer.isBookChosen,
    isPendingBook: state.bookDatabaseReducer.isPendingBook,
    bookInfo: state.bookDatabaseReducer.bookInfo,
    errorBook: state.bookDatabaseReducer.errorBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubjectRequest: () => dispatch(requestSubject()),
    onListRequest: (url) => dispatch(requestList(url)),
    onBookRequest: (url) => dispatch(requestBook(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
