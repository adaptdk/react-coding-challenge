import React, {Component} from 'react';
import EditableBook from './EditableBook';
import PropTypes from 'prop-types';

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {editing: false};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            title: nextProps.title,
            bookshelves: nextProps.bookshelves,
            subjects: nextProps.subjects,
        });
    }
    onClick() {
        this.setState({editing: !this.state.editing});
    }

    render() {
        const {book, completeEdit, subjects} = this.props;
        return (
            <tr key={book.id}>
                { this.state.editing ?
                    <td className="title">
                        <EditableBook
                            key={book.id}
                            subjectOptions={subjects}
                            {...book}
                            isActive
                            onCancel={() => this.onClick()}
                            refreshBooks={(selectedSubject) => this.refreshBooks(selectedSubject)}
                            onComplete={(book) => {
                                completeEdit(book);
                                this.onClick();
                            }}
                        />
                    </td>
                    :
                [
                    <td key={book.id} className="title">
                        <span onClick={() => this.onClick()}>{book.title}</span>
                    </td>

                ]
                }
                <td> {!this.state.editing && book.authors.map((item) => item.name)}</td>
                <td> {!this.state.editing && book.subjects.map((item) => item)}</td>
                <td>
                    {!this.state.editing &&
                    <button onClick={() => this.onClick()}>Edit</button>
                    }
                </td>
            </tr>
        );
    }
}


Book.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    book: PropTypes.object.isRequired,
    bookshelves: PropTypes.string,
    completeEdit: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
};

