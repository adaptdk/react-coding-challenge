import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectSubject, fetchBooksIfNeeded} from '../actions'
import Picker from '../components/Picker'
import Books from '../components/Books'
import { switchEditable, editBook } from '../actions'

class App extends Component {
    static propTypes = {
        selectedSubject: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedSubject} = this.props
        dispatch(fetchBooksIfNeeded(selectedSubject))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubject !== this.props.selectedSubject) {
            const {dispatch, selectedSubject} = nextProps
            dispatch(fetchBooksIfNeeded(selectedSubject))
        }
    }

    handleChange = nextSubject => {
        this.props.dispatch(selectSubject(nextSubject))
    }
    onClick = (id) => {
        alert(2);
        debugger;
        this.props.dispatch(switchEditable(id))

    }
    completeEdit = (id, title, author) => {
        this.props.dispatch(editBook(id, title, author));
        this.props.dispatch(switchEditable(id));
    }

    render() {
        const {selectedSubject, books, isFetching} = this.props
        const isEmpty = books.length === 0
        return (
            <div>
                <Picker value={selectedSubject}
                        onChange={this.handleChange}
                        options={['', 'Fiction', 'Science']}/>
                <p>
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Books
                            books={books}
                            onClick={this.onClick}
                            completeEdit={this.completeEdit}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {selectedSubject, booksBySubject} = state
    const {
        isFetching,
        items: books
    } = booksBySubject[selectedSubject] || {
        isFetching: true,
        items: [],
    }
    return {
        selectedSubject,
        books,
        isFetching,
    }
}


export default connect(mapStateToProps)(App)
