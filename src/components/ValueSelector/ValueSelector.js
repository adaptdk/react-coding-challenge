import React from 'react';
import PropTypes from 'prop-types';

import ValueSelectorItem from './ValueSelectorItem';

import arrayHelper from '../../helpers/arrayHelper';

import './ValueSelector.scss';

const ValueSelector = ({ name, value, onChoiceItemClick, choiceList, choiceListValueDisplayModifier, allowMultiSelect }) => {

  const activeItems = choiceList.map(item => value.indexOf(item) > -1 ? item : null).filter(v => v);

  const handleChoiceItemClick = (value, isActive) => {
    if (allowMultiSelect){
      const newValueCollection = isActive ? arrayHelper.removeItemAtIndex(activeItems, value) : activeItems.concat(value);
      onChoiceItemClick(name, newValueCollection);
    } else {
      onChoiceItemClick(name, value);
    }
  };

  return (
    <div className="value-selector-container row">
      {choiceList.map((choiceListItem, choiceListItemIndex) => {
          const isItemActive = allowMultiSelect ? activeItems.indexOf(choiceListItem) > -1 : choiceListItem === value;
          return (
            <ValueSelectorItem
              key={choiceListItemIndex}
              value={choiceListItem}
              displayValueModifier={choiceListValueDisplayModifier}
              isActive={isItemActive}
              onClick={handleChoiceItemClick}
            />
          );
        }
      )}
    </div>
  );
};

ValueSelector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
  onChoiceItemClick: PropTypes.func.isRequired,
  choiceList: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  choiceListValueDisplayModifier: PropTypes.func,
  allowMultiSelect: PropTypes.bool
};

export default ValueSelector;
