import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ title, onClick }) => (
  <button type="button" className="list-item" onClick={onClick}>{title}</button>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;
