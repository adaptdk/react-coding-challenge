import React, {Component} from 'react';
import PropTypes from 'prop-types'

class EditableBook extends Component {
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
            ...props
        }
    }

    componentWillReceiveProps = ({isActive}) => {
        if (isActive) {
            this.titleInput.focus();
        }
    }

    onKeyPress = (e, fieldName) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onComplete(this.state.title);
            this.setState({title: ''});

        }
        else if (e.keyCode === 27) {
            this.props.onCancel();
            this.setState({title: ''});
        }
    }

    onChange = (e, fieldName) => {
        this.setState({
            [fieldName]: e.target.value
        });
    }

    render = () => (
        <form key={this.key}>
            <label>Title</label> <input
                type="text"
                name="titleInput"
                ref={input => this.titleInput = input}
                value={this.state.title}
                onChange={e => this.onChange(e, 'title')}
                onKeyDown={e => this.onKeyPress(e, 'title')}
            />
            <br/>
            <label>Author</label><input defaultValue={this.state.authors.map((item) => item.name)} />
            <br/>
            <label>Bookshelves</label><input defaultValue={this.state.bookshelves} />
            <br/>
            <label>Subjects</label>
            <select
                multiple="multiple"
                defaultValue={this.state.subjects}>
                {
                    this.state.subjects.map(option =>
                        <option value={option} key={option}>
                            {option}
                        </option>)
                }
            </select>
        </form>
    );
}

export default EditableBook;
