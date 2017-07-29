import React from 'react'
import FieldArrayHeader from './FieldArrayHeader'
import renderTextField from './renderTextField'
import { Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

const renderSingle = ({fields, meta: {error}, name, title}) =>
  <ul>
    <FieldArrayHeader fields={fields} error={error} title={title}/>
    {fields.map((bookshelf, i) =>
      <li key={'bookshelf' + i}>
        <Field
          name={bookshelf}
          component={renderTextField}
          label={name}
        />
        <RaisedButton
          label={'Remove ' + name}
          icon={<i className="material-icons">clear</i>}
          labelPosition="before"
            backgroundColor="#DC143C"
          onClick={() => fields.remove(i)}
        />
      </li>
    )}
  </ul>

export default renderSingle