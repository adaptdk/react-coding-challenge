import React from 'react';
import PropTypes from 'prop-types';
import { Panel, FormGroup, ControlLabel } from 'react-bootstrap';
import { Field, FieldArray } from 'redux-form';
import FieldInput from './FieldInput';
import FieldInputArray from './FieldInputArray';

const FieldSet = ({ config }) => {
  return (
    <div className="FieldSet">
      {
        config.map((item, index) => (
          item.type === 'nested' ?
            <Panel key={index}>
              <FieldArray
                name={item.field}
                component={FieldInputArray}
                config={item}
              />
            </Panel> : item.type === 'multiple' ?
            <Panel key={index}>
              <h3>Formats</h3>
              {
                item.children.map((name, index) => (
                  <FormGroup key={index}>
                    <ControlLabel>{name}</ControlLabel>
                    <Field
                      name={`formats["${name}"]`}
                      component={FieldInput}
                      type="text"
                      placeholder={item.placeholder}
                    />
                  </FormGroup>
                ))
              }
            </Panel> :
            <FormGroup key={index}>
              <ControlLabel>{item.title}</ControlLabel>
              <Field
                name={item.field}
                component={FieldInput}
                type="text"
                placeholder={item.title}
                normalize={item.normalize}
              />
            </FormGroup>
        ))
      }
    </div>
  )
};

FieldSet.propTypes = {
  config: PropTypes.array.isRequired,
};

export default FieldSet;