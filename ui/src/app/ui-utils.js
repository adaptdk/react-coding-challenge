import React from 'react';
import { FormGroup,  Col, FormControl } from 'react-bootstrap';

export const renderInputText = (name, label, value) => (callback) => {
  return (
    <FormGroup>
      <Col sm={3}>
        {label}
      </Col>
      <Col sm={7}>
        <FormControl 
          type="text"
          name={name} 
          value={value || ''}
          onChange={callback} 
        />
      </Col>
    </FormGroup>
  );
};

export const renderInputNumber = (name, label, value) => (callback) => {
  return (
    <FormGroup>
      <Col sm={3}>
        {label}
      </Col>
      <Col sm={7}>
        <FormControl 
          type="number"
          name={name} 
          value={value || ''}
          onChange={callback} 
        />
      </Col>
    </FormGroup>
  );
}