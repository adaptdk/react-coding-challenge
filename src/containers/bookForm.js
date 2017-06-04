import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveBook } from '../actions/index';
import TextField from '../components/form/textField';
import InputSet from '../components/form/inputSet';
import InputArray from '../components/form/inputArray';
import SelectField from '../components/form/selectField';

class BookForm extends Component {

    constructor(props) {
        super(props);
        this.state = { book: props.book };
    }

    getFieldConfig() {
        return [
            { field: 'title', type: TextField, title: 'Title' },
            { field: 'id', type: TextField, title: 'Id' },
            { field: 'download_count', type: TextField, title: 'Download count' },
            { field: 'media_type', type: TextField, title: 'Media Type' },
            { field: 'subjects', type: InputArray, title: 'Subjects', options : {
                type: SelectField,
                options: { values: this.props.subjects }
            } },
            { field: 'authors', type: InputArray, title: 'Authors', options: {
                type: InputSet,
                getDefaultValue: () => { return {}; },
                options: {
                    fields: [
                        { field: 'birth_year', type: TextField, title: 'Birth year' },
                        { field: 'death_year', type: TextField, title: 'Death year' },
                        { field: 'name', type: TextField, title: 'Name' }
                    ]
                }
            } },
            { field: 'bookshelves', type: InputArray, title: 'Bookshelves' },
            { field: 'languages', type: InputArray, title: 'Languages' },
            { field: 'formats', type: InputSet, title: 'Formats', options: {
                fields: [
                    { field: 'text/plain; charset=utf-8', type: TextField, title: 'UTF-8' },
                    { field: 'application/pdf', type: TextField, title: 'PDF' },
                    { field: 'application/rdf+xml', type: TextField, title: 'RDF+XML' },
                    { field: 'application/x-mobipocket-ebook', type: TextField, title: 'Mobipocket' },
                    { field: 'application/epub+zip', type: TextField, title: 'Epub' },
                    { field: 'text/plain; charset=us-ascii', type: TextField, title: 'ASCII' },
                    { field: 'text/html; charset=utf-8', type: TextField, title: 'HTML' }
                ]
            } }
        ]
    }

    handleOnSubmit(ev) {
        this.props.saveBook(this.state.book);
        ev.preventDefault();
    }

    handleOnChange(value) {
        this.setState({ book: value });
    }

    componentWillReceiveProps(nextProps) {

        let book;

        if (nextProps.book) {
            book = JSON.parse(JSON.stringify(nextProps.book));
        }

        this.setState({
            book: book
        })
    }

    render() {{}

        if (!this.state.book) {
            return null;
        }

        return (
            <form className="bookForm" onSubmit={this.handleOnSubmit.bind(this)}>
                <InputSet
                    value={this.state.book}
                    options={{fields: this.getFieldConfig()}}
                    handleOnChange={this.handleOnChange.bind(this)}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        book: state.books.selected,
        subjects: state.subjects
    };
}

export default connect(mapStateToProps, { saveBook })(BookForm);
