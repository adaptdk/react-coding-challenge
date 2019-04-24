import React from 'react';
import PropTypes from 'prop-types';

import './Label.scss';

const Label = ({ text, forName }) => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <label htmlFor={forName} className="label">{text}</label>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  forName: PropTypes.string.isRequired,
};

export default Label;
