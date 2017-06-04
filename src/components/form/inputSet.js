import React from 'react';

import FormFieldComponent from './formFieldComponent';

const labelStyle = { display: 'inline-block', width: 200 };
const setStyle = { paddingLeft: 20, border: '1px solid lightgray'};

export default class InputSet extends FormFieldComponent {

    getDefaultValue() {
        return {};
    }

    formValue(field, newValue) {
        const value = {...this.state.value};
        value[field] = newValue;
        return value;
    }

    renderField(fieldConfig) {

        const value = this.state.value;
        return (
            <div key={fieldConfig.field}>
                <label style={labelStyle}>{fieldConfig.title}</label>
                <fieldConfig.type
                    value={value ? value[fieldConfig.field] : null}
                    options={fieldConfig.options}
                    handleOnChange={this.handlOnChange.bind(this, fieldConfig.field)}
                />
            </div>
        );
    }

    render() {

        if (!this.props.options || !this.props.options.fields) {
            return null;
        }

        return (
            <div style={setStyle} className="inputSet">
                {this.props.options.fields.map(this.renderField.bind(this))}
            </div>
        );
    }
}
