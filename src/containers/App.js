import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectSubject, fetchBooksIfNeeded, editBook, fetchSubjects} from '../actions'
import Picker from '../components/Picker'
import Books from '../components/Books'

class App extends Component {
    static propTypes = {
        selectedSubject: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedSubject} = this.props
        dispatch(fetchBooksIfNeeded(selectedSubject))
        dispatch(fetchSubjects())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubject !== this.props.selectedSubject) {
            const {dispatch, selectedSubject} = nextProps
            dispatch(fetchBooksIfNeeded(selectedSubject))
        }
    }

    handleChange = (options) => {
        let values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        this.props.dispatch(selectSubject(values))
    }
    completeEdit = (id, title) => {
        this.props.dispatch(editBook(id, title));
    }

    render() {
        const {selectedSubject, books, subjects, isFetching} = this.props,
            isEmpty = books.length === 0;

        return (
            <div>{!isEmpty &&
            <Picker value={[selectedSubject]}
                    onChange={this.handleChange}
                    options={['',...subjects.subjects]}/>
            }

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
                <p>
                </p>
                <small>Click to edit, enter to save <br />
                <hr/>
                    (c) Eimantas, <a href="tel:+37067790818">+37067790818</a>
                </small>
            </div>



        )
    }
}

const mapStateToProps = (state) => {
    const {selectedSubject, booksBySubject} = state;

    const {
        isFetching,
        items: books,
    } = booksBySubject[selectedSubject] || {
        isFetching: true,
        items: [],
        subjects: [],
    }
    return {
        selectedSubject,
        books,
        subjects: state.subjects,
        isFetching,
    }
}


export default connect(mapStateToProps)(App)
