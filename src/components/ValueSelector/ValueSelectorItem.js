import React from 'react';
import PropTypes from 'prop-types';

class ValueSelectorItem extends React.Component {

  constructor(){
    super();
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick(){
    this.props.onClick(this.props.value, this.props.isActive);
  }

  render() {
    const { value, isActive, displayValueModifier } = this.props;
    return (
      <div
        className={`value-selector-item ${isActive ? 'state--active' : ''}`}
        onClick={this._handleOnClick}
      >
        {displayValueModifier ? displayValueModifier(value) : value}
      </div>
    );
  }
}

ValueSelectorItem.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  displayValueModifier: PropTypes.func,
  isActive: PropTypes.bool.isRequired
};

export default ValueSelectorItem;
