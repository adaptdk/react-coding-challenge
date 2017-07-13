import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getSelectValues from '../utils/select';

class EditableBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps({isActive}) {
        if (isActive) {
            this.titleInput.focus();
        }
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onComplete(this.state);
        }
        else if (e.keyCode === 27) {
            this.props.onCancel();
            this.setState({title: ''});
        }
    }

    onChange(e, fieldName) {
        delete this.state.subjectOptions;
        switch (fieldName) {
        case 'authors': {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.authors = stateCopy.authors.slice();
            stateCopy.authors[0] = Object.assign({}, stateCopy.authors[0]);
            stateCopy.authors[0].name = e.target.value;
            this.setState(stateCopy);
            break;
        }
        case 'subjects':
            this.setState({
                subjects: getSelectValues(e.target),
            });
            this.props.refreshBooks(getSelectValues(e.target));
            break;
        default:
            this.setState({
                [fieldName]: e.target.value
            });
        }

    }

    render() {
        return (
            <form key={this.key} onSubmit={() => this.props.onComplete(this.state)}>
                <label>Title</label> <input
                type="text"
                name="titleInput"
                ref={input => this.titleInput = input}
                value={this.state.title}
                onChange={e => this.onChange(e, 'title')}
                onKeyDown={e => this.onKeyPress(e, 'title')}
            />
                <br/>
                <label>Author</label><input onChange={e => this.onChange(e, 'authors')}
                                            value={this.state.authors.map((item) => item.name)}/>
                <br/>
                <label>Bookshelves</label><input onChange={e => this.onChange(e, 'bookshelves')}
                                                 value={this.state.bookshelves}/>
                <br/>
                <label htmlFor="subjects">Subjects</label>
                <select
                    onChange={e => this.onChange(e, 'subjects')}
                    id="subjects"
                    multiple="multiple"
                    value={this.state.subjects}>
                    {
                        this.props.subjectOptions.map(option =>
                            <option value={option} key={option}>
                                {option}
                            </option>)
                    }
                </select>
                <p>
                    <input type="submit" value="Save"/>
                    <button onClick={() => this.props.onCancel}>Cancel</button>
                </p>
            </form>
        );
    }
}

EditableBook.propTypes = {
    onBookAdd: PropTypes.func,
    isActive: PropTypes.bool.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    refreshBooks: PropTypes.func,
    title: PropTypes.string,
    author: PropTypes.string,
    subjectOptions: PropTypes.array.isRequired,
};

export default EditableBook;
