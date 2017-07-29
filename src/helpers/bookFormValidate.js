const getObjectPropsErr = (object, props, message) => {
  const errors = {}
  let hasError = false
  props.forEach(prop => {
    if(!object[prop]) {
      errors[prop] = message
      hasError = true
    }
  })
  return {errors, hasError}
}

const getArrayFieldsErrors = (arrayValues, props, message) => {
    const errors = []
    arrayValues.forEach((object, i) => {
      object = object || {}
      const objectErrors = getObjectPropsErr(object, props, message)
      if(objectErrors.hasError) {
        errors[i] = objectErrors.errors
      }
    })
    return errors
}

export default function validate (values) {
  const errors = {}
  const requiredFields = ['id', 'title', 'download_count', 'media_type']
  const requiredArrayFields = ['bookshelves', 'languages', 'subjects', 'authors', 'formats']
  const requiredArrayGroupFields = {'authors': ['name', 'birth_year', 'death_year'], 'formats': ['url', 'type']}
  const requiredArrayFieldsProps = 
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  Object.entries(requiredArrayGroupFields).forEach(([arrayField, props]) => {
    const arrErrors = getArrayFieldsErrors(values[arrayField], props, 'Required')
    if(arrErrors.length > 0) {
      errors[arrayField] = arrErrors
    }
  })
  requiredArrayFields.forEach(arrayField => {
    if(!errors[arrayField]) {
      if(!values[arrayField] || !values[arrayField].length) {
        errors[arrayField] = {_error: `At least one value of field ${arrayField} must be set`}
      }
      const arrErrors = []
      values[arrayField].forEach((field, i) => {
        if(!field) {
          arrErrors[i] = 'Required'
        }
      })
      if(arrErrors.length > 0) {
        errors[arrayField] = arrErrors
      }
    }
  })
  return errors
}
