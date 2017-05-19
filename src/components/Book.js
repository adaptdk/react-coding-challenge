import React, {Component} from 'react';
import EditableBook from './EditableBook'

export default class Book extends Component {
    state = {
        editing: false
    }
    onClick = () => {
        this.setState({editing: !this.state.editing})
    }

    render() {
        const {book, completeEdit} = this.props;
        return (
            <tr key={book.id}>
                { this.state.editing ?
                    <td className="title">
                        <EditableBook
                            key={book.id}
                            {...book}
                            isActive
                            onCancel={() => this.onClick()}
                            onComplete={(title) => {
                                completeEdit(book.id, title);
                                this.onClick();
                            }}
                        />
                    </td>
                    :
                    [
                        <td  key={book.id} className="title">
                            <span onClick={() => this.onClick()}>{book.title}</span>
                        </td>

                    ]
                }
                <td> {!this.state.editing && book.authors.map((item) => item.name)}</td>
                <td>
                    <button onClick={() => this.onClick()}> {this.state.editing ? 'Cancel' : 'Edit'} </button>
                </td>
            </tr>
        )
    }
}
