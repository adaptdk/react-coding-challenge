import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectBook } from '../actions/index';

class BookSelection extends Component {

    handleOnChange(event) {
        this.props.selectBook(event.target.value);
    }

    renderOptions() {
        return Object.keys(this.props.books).map((key) => {

            const book = this.props.books[key];
            return (
                <option key={book.id} value={book.id}>
                    {book.title}
                </option>
            );
        })
    }

    render() {

        if (Object.keys(this.props.books).length < 1) {
            return null;
        }

        return (
            <div className="bookSelection" onChange={this.handleOnChange.bind(this)}>
                <label>Select book: </label>
                <select>
                    <option></option>
                    {this.renderOptions()}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.all
    };
}

export default connect(mapStateToProps, { selectBook })(BookSelection);
