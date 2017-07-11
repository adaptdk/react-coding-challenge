import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form'
import { FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';
import FieldInput from './FieldInput';

const FieldInputArray = ({ fields, config }) => {
  return (
    <div>
      {
        fields.map((field, index) => (
          <div key={index}>
            <Row>
              <Col xs={6}>
                <h3>{config.title} #{index + 1}</h3>
              </Col>
              <Col xs={6}>
                <Button
                  className="button--remove"
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  Remove {config.title}
                </Button>
              </Col>
            </Row>
            {
              config.children.map((child, index) => (
                <FormGroup key={index}>
                  <ControlLabel>{child.label}</ControlLabel>
                  <Field
                    name={`${field}.${child.property}`}
                    component={FieldInput}
                    type="text"
                    placeholder={child.label}
                  />
                </FormGroup>
              ))
            }
          </div>
        ))
      }
      <Button
        className="button--add" type="button"
        onClick={() => fields.push({})}
      >
        Add {config.title}
      </Button>
    </div>
  )
};

FieldInputArray.propTypes = {
  fields: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default FieldInputArray;