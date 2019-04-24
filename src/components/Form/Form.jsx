import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../elements/Input';
import Button from '../../elements/Button';

import useForm from '../../hooks/useForm';

import './Form.scss';

const Form = ({ book, handleUpdate }) => {
  const {
    handleChange,
    handleCollectionChange,
    handleSubmit,
  } = useForm(book, handleUpdate);

  const {
    id,
    title,
    download_count: downloadCount,
    media_type: mediaType,
    subjects,
    bookshelves,
    authors,
  } = book;

  return (
    <section className="section">
      <h2 className="section__heading">Edit</h2>
      <form id={id} className="form" onSubmit={handleSubmit}>
        <Input
          name="title"
          value={title}
          label="Title"
          onChange={handleChange}
        />

        <div className="form__group">
          <Input
            type="number"
            name="download_count"
            value={downloadCount}
            label="Download count"
            size="small"
            onChange={handleChange}
          />
          <Input
            name="media_type"
            value={mediaType}
            label="Media type"
            onChange={handleChange}
          />
        </div>

        <h3 className="form__heading">Subjects</h3>
        {subjects.map((subject, index) => (
          <div key={`subjects_group_${index}`} className="form__group">
            <Input
              name={`subjects_${index}`}
              value={subject}
              onChange={handleCollectionChange}
            />
          </div>
        ))}

        <h3 className="form__heading">Bookshelves</h3>
        {bookshelves.map((bookshelf, index) => (
          <div key={`bookshelves_group_${index}`} className="form__group">
            <Input
              key={`bookshelves_${index}`}
              name={`bookshelves_${index}`}
              value={bookshelf}
              label="Name"
              onChange={handleCollectionChange}
            />
          </div>
        ))}

        <h3 className="form__heading">Authors</h3>
        {authors.map((author, index) => (
          <div key={`author_group_${index}`} className="form__group">
            <Input
              key={`author_name_${index}`}
              name={`author_name_${index}`}
              value={author.name}
              label="Name"
              size="medium"
              readOnly
            />
            <Input
              key={`author_birth_year_${index}`}
              type="number"
              name={`author_birth_year_${index}`}
              value={author.birth_year}
              label="Birth year"
              size="small"
              readOnly
            />
            <Input
              key={`author_${index}_death_year`}
              type="number"
              name={`author_${index}_death_year`}
              value={author.death_year}
              label="Death year"
              size="small"
              readOnly
            />
          </div>
        ))}

        <Button text="Update" />
      </form>
    </section>
  );
};

Form.propTypes = {
  // Object structure should be defined more precisely with shape
  // eslint-disable-next-line react/forbid-prop-types
  book: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default Form;
