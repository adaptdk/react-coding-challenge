import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import validate from '../helpers/bookFormValidate'
import {integersOnly} from '../helpers/normalize'
import renderTextField from './forms/bookForm/renderTextField'
import renderAuthors from './forms/bookForm/renderAuthors'
import renderSingle from './forms/bookForm/renderSingle'
import renderFormats from './forms/bookForm/renderFormats'

const BookForm = props => {
  const {handleSubmit, pristine, reset, submitting, method, type} = props
  const id_disabled = type && type === 'edit' ? true : false
  return(
    <form className="bookForm" onSubmit={handleSubmit(method)}>
      <div>
        <Field disabled={id_disabled} normalize={integersOnly} name="id" component={renderTextField} label="ID"/>
      </div>
      <div>
        <Field name="title" component={renderTextField} label="Title"/>
      </div>
      <div>
        <Field normalize={integersOnly} name="download_count" component={renderTextField} label="Download count"/>
      </div>
      <div>
        <Field name="media_type" component={renderTextField} label="Media Type"/>
      </div>
      <div>
        <FieldArray title={'Subjects'} props={{name: 'Subject'}} name="subjects" component={renderSingle}/>
      </div>
      <div>
        <FieldArray title={'Authors'}  name="authors" component={renderAuthors}/>
      </div>
      <div>
        <FieldArray title={'Bookshelves'}  props={{name: 'Bookshelf'}} name="bookshelves" component={renderSingle}/>
      </div>
      <div>
        <FieldArray title={'Formats'}  name="formats" component={renderFormats}/>
      </div>
      <div>
        <FieldArray title={'Languages'}  props={{name: 'Language'}} name="languages" component={renderSingle}/>
      </div>
      <div>
        <RaisedButton type="submit" disabled={submitting} label="Save" primary={true} style={{margin: 12}} />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'BookForm2',
  enableReinitialize: true,
  validate,
})(BookForm)