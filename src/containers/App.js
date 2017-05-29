import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectSubject, fetchBooksIfNeeded, editBook, fetchSubjects, invalidateSubject} from '../actions';
import Picker from '../components/Picker';
import Books from '../components/Books';
import getSelectValues from '../utils/select';
import PropTypes from 'prop-types';

class App extends Component {
    componentDidMount() {
        const {dispatch, selectedSubject} = this.props;
        dispatch(fetchBooksIfNeeded(selectedSubject));
        dispatch(fetchSubjects());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubject !== this.props.selectedSubject) {
            const {dispatch, selectedSubject} = nextProps;
            dispatch(fetchBooksIfNeeded(selectedSubject));
        }
    }

    refreshBooks(selectedSubject) {
        this.props.dispatch(invalidateSubject(selectedSubject));
    }

    handleChange(options) {
        this.props.dispatch(selectSubject(getSelectValues(options)));
    }

    completeEdit(data) {
        this.props.dispatch(editBook(data, this.props.selectedSubject));
    }

    render() {
        const {selectedSubject, books, subjects, isFetching} = this.props,
            isEmpty = books.length === 0;
        return (
            <div>
                <Picker values={selectedSubject}
                        onChange={(options) => this.handleChange(options)}
                        options={['', ...subjects.subjects]}/>


                <p>
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Books
                            subjects={subjects.subjects}
                            books={books}
                            completeEdit={(data) => {
                                this.completeEdit(data);
                            }}
                            refreshBooks={(selectedSubject) => {
                                this.refreshBooks(selectedSubject);
                            }}
                        />
                    </div>
                }
                <p>
                </p>
                <small>Click to edit, enter to save <br />
                    <hr/>
                    (c) Eimantas, <a href="tel:+37067790818">+37067790818</a>
                </small>
            </div>



        );
    }
}

App.propTypes = {
    selectedSubject: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    subjects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {selectedSubject, booksBySubject} = state;
    const {
        isFetching,
        items: books,
    } = booksBySubject[selectedSubject] || {
        isFetching: true,
        items: [],
        subjects: [],
    };
    return {
        selectedSubject,
        books,
        subjects: state.subjects,
        isFetching,
    };
};


export default connect(mapStateToProps)(App);
