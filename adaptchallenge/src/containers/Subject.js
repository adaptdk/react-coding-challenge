import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import Select from 'react-select';


class Subject extends Component {

  render() {

    const { subjects, onListRequest } = this.props;

    const subjectOptions = subjects.map(subject => {
      return { value: subject, label: subject}
    });
    const subjectDefaultValue = {
      subject: subjectOptions[0]
    }

    return (
      <div className='main'>
        <h3>Select Subject:</h3>

        <Formik
          initialValues={subjectDefaultValue}
          onSubmit={(values, { setSubmitting }) => {
            const url = `http://localhost:3010/books?subjects_like=${values.subject.value}`;
            onListRequest(url);
            setSubmitting(false);
          }}>
          {props => {
            const {
              values,
              isSubmitting,
              setFieldValue
            } = props;

            return (
              <Form>

                <Select
                  id='subject'
                  options={subjectOptions}
                  onChange={value => setFieldValue("subject", value)}
                  value={values.subject}
                />
                <button type="submit" disabled={isSubmitting}>
                  Select
                </button>

              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }

}

export default Subject;
