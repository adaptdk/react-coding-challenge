import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSubjects, fetchBooks } from '../actions/index';

class SubjectSelection extends Component {

    componentWillMount() {
        this.props.fetchSubjects();
    }

    handleOnChange(event) {
        this.props.fetchBooks(event.target.value);
    }

    renderOptions() {
        return this.props.subjects.map((subject) => {
            return (
                <option key={subject} value={subject}>
                    {subject}
                </option>
            );
        })
    }

    render() {
        return (
            <div className="subjectSelection">
                <label>Select subject: </label>
                <select onChange={this.handleOnChange.bind(this)}>
                    <option></option>
                    {this.renderOptions()}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subjects: state.subjects
    };
}

export default connect(
    mapStateToProps,
    { fetchSubjects, fetchBooks }
)(SubjectSelection);
