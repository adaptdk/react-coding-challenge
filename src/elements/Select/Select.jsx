import React from 'react';
import PropTypes from 'prop-types';

import './Select.scss';

const Select = ({
  name,
  placeholder,
  options,
  value,
  ...attributes
}) => (
  <div className="select">
    <select className="select__field" name={name} {...attributes}>
      {placeholder && <option>{placeholder}</option>}
      {options.map(option => <option key={option}>{option}</option>)}
    </select>
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

Select.defaultProps = {
  placeholder: '',
  value: '',
};

export default Select;
