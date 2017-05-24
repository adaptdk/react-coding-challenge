import React, {Component} from 'react';
import EditableBook from './EditableBook'

export default class Book extends Component {
    state = {
        editing: false
    }
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps);
        this.setState({
            id: nextProps.id,
            title: nextProps.title,
            bookshelves: nextProps.bookshelves
        });
    }
    onClick = () => {
        this.setState({editing: !this.state.editing})
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
                            onComplete={(book) => {
                                completeEdit(book);
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
                    {!this.state.editing &&
                        <button onClick={() => this.onClick()}>Edit</button>
                    }
                </td>
            </tr>
        )
    }
}
