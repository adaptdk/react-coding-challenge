import React from 'react';
import FormFieldComponent from './formFieldComponent';

export default class SelectField extends FormFieldComponent {

    formValue(ev) {
        return ev.target.value;
    }

    renderOptions(option) {
        return (
            <option key={option} value={option}>{option}</option>
        );
    }

    render() {
        return (
            <select className="selectField" value={this.state.value} onChange={this.handlOnChange.bind(this)}>
                <option></option>
                {this.props.options.values.map(this.renderOptions)}
            </select>
        );
    }
}
