import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../elements/Select/Select';

import { SUBJECT_PLACEHOLDER } from '../../../project.config';

const Subject = ({ subjects, handleSubject }) => (
  <section className="section">
    <h1 className="section__heading">Genre</h1>
    {subjects && (
      <Select
        placeholder={SUBJECT_PLACEHOLDER}
        name="subject"
        options={subjects}
        onChange={handleSubject}
      />
    )}
  </section>
);

Subject.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.string),
  handleSubject: PropTypes.func.isRequired,
};

Subject.defaultProps = {
  subjects: [],
};

export default Subject;
