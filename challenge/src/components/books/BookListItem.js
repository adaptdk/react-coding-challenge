import React, { Component } from 'react'
import 'components/books/BookListItem.css';
import PropTypes from 'prop-types'

class BookListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.book
        }
    }

    setSelectedItem(item) {
        this.props.setSelectedItem(item)
    }

    render() {
        return (
            <div className="row bookListItem" key={this.state.item.id} onClick={(event, data) => this.setSelectedItem(this.state.item)}>
                <div className="col-sm-8 text-truncate"><b>{this.state.item.title}</b></div>
                <div className="col-sm-4">
                    {this.state.item.authors.map(author => (
                        author.name
                    ))}
                </div>
            </div>
        );
    }
}

BookListItem.propTypes = {
    setSelectedBook: PropTypes.func
}

export default BookListItem