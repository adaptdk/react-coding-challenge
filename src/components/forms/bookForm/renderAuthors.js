import React from 'react'
import FieldArrayHeader from './FieldArrayHeader'
import renderTextField from './renderTextField'
import { Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

const renderAuthors = ({fields, meta: {error}, title}) =>{
  return (
    <ul>
      <FieldArrayHeader fields={fields} error={error} title={title}/>
      {fields.map((author, index) => 
        <li key={'author' + index}>
          <Field
            name={`${author}.name`}
            component={renderTextField}
            label="Name"
          />
          <Field
            name={`${author}.birth_year`}
            component={renderTextField}
            label="Birth Year"
          />
          <Field
            name={`${author}.death_year`}
            component={renderTextField}
            label="Death year"
          />
          <RaisedButton
            label={'Remove Author'}
            icon={<i className="material-icons">clear</i>}
            labelPosition="before"
            backgroundColor="#DC143C"
            onClick={() => fields.remove(index)}
          />
        </li>
      )}
    </ul>
  )
}

export default renderAuthors