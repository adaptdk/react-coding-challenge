import React from 'react';

import FormFieldComponent from './formFieldComponent';
import TextField from './textField';

export default class InputArray extends FormFieldComponent {

    getDefaultValue() {
        return [];
    }

    formValue(index, newValue) {
        const value = [...this.state.value];
        value[index] = newValue;
        return value;
    }

    onAddClick() {

        let defaultValue = '';

        if (this.props.options && this.props.options.getDefaultValue) {
            defaultValue = this.props.options.getDefaultValue();
        }

        this.handlOnChange(this.state.value.length, defaultValue)
    }

    renderItem(itemValue, index) {

        const value = this.props.value || [];
        const options = this.props.options || {};
        const Type = options.type ? options.type : TextField;

        return (
            <Type
                key={index}
                value={itemValue || null}
                options={options.options}
                handleOnChange={this.handlOnChange.bind(this, index)}
            />
        );
    }

    render() {
        return (

            <div className="inputArray">
                {this.state.value.map(this.renderItem.bind(this))}
                <a href="javascript:void(0);" onClick={this.onAddClick.bind(this)}>Add</a>
            </div>
        );
    }
}
