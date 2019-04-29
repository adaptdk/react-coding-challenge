import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import Select from 'react-select';


class List extends Component {


  render() {

    const { list, onBookRequest } = this.props;

    const listOptions = list.map(book => {
      const bookTitle = book.title + ' by ' + book.authors[0].name;
      return { value: book.id, label: bookTitle}
    });
    const listDefaultValue = {
      list: listOptions[0]
    }

    return (
      <div className='main'>

        { <div>
            <h3>Select Book:</h3>

            <Formik
              initialValues={listDefaultValue}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                const url = `http://localhost:3010/books?id=${values.list.value}`;
                onBookRequest(url);
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
                      id='list'
                      options={listOptions}
                      onChange={value => setFieldValue("list", value)}
                      value={values.list}
                    />
                    <button type="submit" disabled={isSubmitting}>
                      Select
                    </button>

                  </Form>
                );
              }}
            </Formik>

          </div> }
      </div>
    );
  }
}

export default List;
