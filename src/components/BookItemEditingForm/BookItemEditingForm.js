import React from 'react';
import PropTypes from 'prop-types';

import ValueSelector from '../../components/ValueSelector';

import { AVAILABLE_BOOK_FORMATS } from '../../constants';

class BookItemEditingForm extends React.Component {

  constructor(){
    super();
    this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
  }

  handleFormFieldChange(fieldName, fieldValue){
    this.props.onFieldChange(fieldName, fieldValue);
  }

  render() {

    const { bookItem } = this.props;

    if (Object.keys(bookItem).length === 0){
      return null;
    }

    return (
      <form name="bookItemEditingForm" className="book-item-editing-form">
        <h4>Select formats</h4>
        <ValueSelector
          name="formats"
          value={Array.isArray(bookItem.formats) ? bookItem.formats : Object.keys(bookItem.formats)}
          onChoiceItemClick={this.handleFormFieldChange}
          choiceList={AVAILABLE_BOOK_FORMATS}
          choiceListValueDisplayModifier={(item) => item.replace('application/', '')}
          allowMultiSelect
        />
      </form>
    );
  }
}

BookItemEditingForm.propTypes = {
  bookItem: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default BookItemEditingForm;
