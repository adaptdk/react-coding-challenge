import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';


class Book extends Component {

  render() {

    const { bookInfo } = this.props;

    const initialValues = { id: bookInfo[0].id,
                            authors: bookInfo[0].authors,
                            bookshelves: bookInfo[0].bookshelves,
                            downloadCount: bookInfo[0].download_count,
                            formats: bookInfo[0].formats,
                            languages: bookInfo[0].languages,
                            mediaType: bookInfo[0].media_type,
                            subjects: bookInfo[0].subjects,
                            title: bookInfo[0].title
                          };

    return (
      <div className='main'>
        <h3>Book Info:</h3>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {

            fetch(`http://localhost:3010/books/${values.id}`, {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: values.id,
                authors: values.authors,
                bookshelves: values.bookshelves,
                download_count: values.downloadCount,
                formats: values.formats,
                languages: values.languages,
                media_type: values.mediaType,
                subjects: values.subjects,
                title: values.title
              })
            });

            setSubmitting(false);
          }}>
          {props => {
            const {
              values,
              isSubmitting,
            } = props;
            return (
              <Form>

                <label htmlFor="id" className='label_std'>
                  Book ID:
                </label>
                <Field
                  name="id"
                  type="text"
                  value={values.id}
                  className='input_std'
                />

                <label htmlFor="authors" className='label_std'>
                  Authors:
                </label>
                { values.authors.map((author, ind) => {
                  const idName = `authors[${ind}].name`;
                  const idBirthYear = `authors[${ind}].birth_year`;
                  const idDeathYear = `authors[${ind}].death_year`;
                  return  <div key={ind} >
                            { ind === 0 &&
                              <div key={ind + 'label'} className='author'>
                                <label htmlFor={idName} style={{ display: 'block' }}>Name </label>
                                <label htmlFor={idBirthYear} style={{ display: 'block' }}>Birth Year</label>
                                <label htmlFor={idDeathYear} style={{ display: 'block' }}>Death Year</label>
                              </div> }
                            <div key={ind + 'info'} className='author'>
                              <Field name={idName} type='text' value={author.name} className='input_short' />
                              <Field name={idBirthYear} type='text' value={author.birth_year} className='input_short' />
                              <Field name={idDeathYear} type='text' value={author.death_year} className='input_short' />
                            </div>
                          </div>
                })}

                <label htmlFor="bookshelves" className='label_std'>
                  Bookshelves:
                </label>
                { values.bookshelves.map((bookshelve, ind) => {
                  const id = `bookshelves[${ind}]`;
                  return  <Field key={ind} name={id} type='text' value={bookshelve} className='input_std'/>
                })}

                <label htmlFor="downloadCount" className='label_std'>
                  Download Count:
                </label>
                <Field
                  name="downloadCount"
                  type="text"
                  value={values.downloadCount}
                  className='input_std'
                />

                <label htmlFor="formats" className='label_std'>
                  Formats:
                </label>
                { Object.entries(values.formats).map((format, ind) => {
                  const id = `formats[${format[0]}]`;
                  return  <div key={format[0]} >
                            <label htmlFor={format[0]} className='label_formats'>{format[0]}:</label>
                            <Field name={id} type='text' value={format[1]} className='input_std'/>
                          </div>
                })}

                <label htmlFor="languages" className='label_std'>
                  Languages:
                </label>
                { values.languages.map((language, ind) => {
                  const id = `languages[${ind}]`;
                  return  <Field key={ind} name={id} type='text' value={language} className='input_std' />
                })}

                <label htmlFor="mediaType" className='label_std'>
                  Media Type:
                </label>
                <Field
                  name="mediaType"
                  type="text"
                  value={values.mediaType}
                  className='input_std'
                />

                <label htmlFor="subjects" className='label_std'>
                  Subjects:
                </label>
                { values.subjects.map((subject, ind) => {
                  const id = `subjects[${ind}]`;
                  return  <Field key={ind} name={id} type='text' value={subject} className='input_std'/>
                })}

                <label htmlFor="title" className='label_std'>
                  Title:
                </label>
                <Field
                  name="title"
                  type="text"
                  value={values.title}
                  className='input_std'
                />

                <button type="submit" disabled={isSubmitting}>
                  Update Info
                </button>

              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default Book;
