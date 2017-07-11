import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

const Selector = ({ values, onChange, options, multiple }) => (
  <form>
    <FormGroup>
      <FormControl
        componentClass="select"
        multiple={multiple}
        onChange={onChange}
        value={multiple ? values : values[0]}
      >
        {
          options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))
        }
      </FormControl>
    </FormGroup>
  </form>
);

Selector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default Selector;