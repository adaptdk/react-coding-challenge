import React from 'react'
import FieldArrayHeader from './FieldArrayHeader'
import renderTextField from './renderTextField'
import { Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

const renderFormats = ({fields, meta: {error}, title}) =>
    <ul>
        <FieldArrayHeader fields={fields} error={error} title={title}/>
        {fields.map((format, i) =>
        <li key={'fomart' + i}>
            <Field
            name={`${format}.type`}
            component={renderTextField}
            label="Type"
            />
            <Field
            name={`${format}.url`}
            component={renderTextField}
            label="URL"
            />
            <RaisedButton
            label={'Remove format'}
            icon={<i className="material-icons">clear</i>}
            labelPosition="before"
            backgroundColor="#DC143C"
            onClick={() => fields.remove(i)}
            />
        </li>
        )}
    </ul>

export default renderFormats