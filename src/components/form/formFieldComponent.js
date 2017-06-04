import React, { Component } from 'react';

export default class FormFieldComponent extends Component {

    getDefaultValue() {
        return '';
    }

    constructor(props) {
        super(props);
        this.state = { value: props.value || this.getDefaultValue() };
    }

    handlOnChange() {

        const value = this.formValue(...arguments);

        if (this.props.handleOnChange) {
            this.props.handleOnChange(value);
        }

        this.setState({ value: value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || this.getDefaultValue()
        });
    }
}
