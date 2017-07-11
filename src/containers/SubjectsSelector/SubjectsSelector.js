import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { destroy as destroyForm } from 'redux-form'
import Selector from '../../components/Selector';
import { selectSubjects, fetchSubjects } from '../../redux/modules/subjects';
import { fetchBooks } from '../../redux/modules/books';


class SubjectsSelector extends Component {
  static propTypes = {
    fetchSubjects: PropTypes.func,
    selectSubjects: PropTypes.func,
    fetchBooks: PropTypes.func,
    destroyForm: PropTypes.func,
    subjects: PropTypes.array,
    selectedSubjects: PropTypes.array,
  };

  static defaultProps = {
    selectedSubjects: [],
    subjects: [],
  };

  componentDidMount() {
    const { fetchSubjects } = this.props;
    fetchSubjects();
  }

  handleSubjectChange = (e) => {
    const { selectSubjects, fetchBooks, destroyForm } = this.props;
    const values = [...e.target.options]
      .filter(({ selected }) => (selected))
      .map(({ value }) => (value));

    destroyForm();
    selectSubjects(values);
    fetchBooks(values);
  };

  render() {
    const { selectedSubjects, subjects } = this.props;
    return (
      <Panel header="Select subjects">
        <Selector
          values={selectedSubjects}
          onChange={this.handleSubjectChange}
          options={subjects}
          multiple
        />
      </Panel>
    );
  };
}

const mapStateToProps = ({ subjects }) => ({
  subjects: subjects.all,
  selectedSubjects: subjects.selected,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubjects: () => {
    dispatch(fetchSubjects());
  },
  selectSubjects: (subjects) => {
    dispatch(selectSubjects(subjects));
  },
  fetchBooks: (subjects) => {
    dispatch(fetchBooks(subjects));
  },
  destroyForm: () => {
    dispatch(destroyForm('bookEditForm'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubjectsSelector);
