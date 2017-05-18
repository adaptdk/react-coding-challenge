import React, { PropTypes } from 'react';
import Book from './Book';

class EditableBook extends React.Component {
    static propTypes = {
        onBookAdd: PropTypes.func,
        isActive: PropTypes.bool.isRequired,
        onComplete: PropTypes.func.isRequired,
        onCancel: PropTypes.func,

        title: PropTypes.string,
        author: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || '',
            author: props.author || ''
        }
    }

    componentWillReceiveProps = ({ isActive }) => {
        if (isActive) {
            this.titleInput.focus();
        }
    }

    onKeyPress = (e, fieldName) => {
        if (e.keyCode === 13) {
            this.props.onComplete(this.state.title, this.state.author);
            this.setState({title: '', author: ''});
        }
        else if (e.keyCode === 27) {
            this.props.onCancel();
            this.setState({title: '', author: ''});
        }
    }

    onChange = (e, fieldName) => {
        this.setState({
            [fieldName]:e.target.value
        });
    }

    render = () => (
        <form>
            <Book
                title={
                    <input
                        type="text"
                        placeholder="Title"
                        innerRef={input => this.titleInput = input}
                        value={this.state.title}
                        onChange={e => this.onChange(e, 'title')}
                        onKeyDown={e => this.onKeyPress(e, 'title')}
                    />
                }
                onDeleteButtonClick={this.props.onCancel}
            />
        </form>
    );
}

export default EditableBook;
