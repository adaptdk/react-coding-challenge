import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({
  type,
  text,
  disabled,
  ...attributes
}) => (
  // It is encouraged not to use dynamic type
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    className="button"
    disabled={disabled}
    {...attributes}
  >
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'submit',
  text: 'Submit',
  disabled: false,
};

export default Button;
