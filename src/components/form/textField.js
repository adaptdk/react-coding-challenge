import React from 'react';
import FormFieldComponent from './formFieldComponent';

export default class TextField extends FormFieldComponent {

    formValue(ev) {
        return ev.target.value;
    }

    render() {
        return (
            <input className="textField" value={this.state.value} onChange={this.handlOnChange.bind(this)}/>
        );
    }
}
