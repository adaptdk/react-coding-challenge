import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';

import './Input.scss';

const Input = ({
  name,
  type,
  label,
  value,
  size,
  ...attributes
}) => (
  <div className={`input-group ${size ? `input-group--${size}` : ''}`}>
    {label && <Label forName={name} text={label} />}
    <input
      id={name}
      name={name}
      type={type}
      className="input-group__field"
      defaultValue={value}
      {...attributes}
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'number',
  ]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  label: '',
  size: '',
};

export default Input;
