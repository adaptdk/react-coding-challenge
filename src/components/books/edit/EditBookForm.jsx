import React, { useContext } from "react";

import { AppContext } from "../../../AppContext.jsx";
import CustomButton from "../../Button.jsx";
import { Input } from "../../forms/Forms.jsx";

const EditBookForm = ({
  handleSubmit,
  handleChange,
  disable,
  selectedBook,
}) => {
  const {
    addAuthor,
    addBookshelf,
    addLanguage,
    addSubject,
    deleteLastAuthor,
    deleteBookshelf,
    deleteSubject,
    deleteLanguage,
  } = useContext(AppContext);

  const authorInput = selectedBook.authors.map((author, idx) => {
    return (
      <React.Fragment key={idx}>
        <Input
          label="Birth Year"
          id="birth_year"
          placeholder="Birth Year"
          name={`authors.${idx}.birth_year`}
          handleChange={(e) => handleChange(e)}
          value={author.birth_year}
        />
        <Input
          label="Death Year"
          id="death_year"
          placeholder="Death Year"
          name={`authors.${idx}.death_year`}
          handleChange={handleChange}
          value={author.death_year}
        />
        <Input
          label="Name"
          id="name"
          placeholder="Name"
          name={`authors.${idx}.name`}
          handleChange={handleChange}
          value={author.name}
        />
      </React.Fragment>
    );
  });

  const bookshelfInput = selectedBook.bookshelves.map((bookshelf, idx) => {
    return (
      <React.Fragment key={idx}>
        <Input
          label="Title"
          id="bookshelves"
          placeholder="Bookshelf"
          name={`bookshelves.${idx}`}
          handleChange={handleChange}
          value={bookshelf}
        />
      </React.Fragment>
    );
  });

  const languageInput = selectedBook.languages.map((language, idx) => {
    return (
      <React.Fragment key={idx}>
        <Input
          label=""
          id="language"
          placeholder="Language"
          name={`languages.${idx}`}
          handleChange={handleChange}
          value={language}
        />
      </React.Fragment>
    );
  });

  const subjectInput = selectedBook.subjects.map((subject, idx) => {
    return (
      <React.Fragment key={idx}>
        <Input
          label=""
          id="subjects"
          placeholder="Subject"
          name={`subjects.${idx}`}
          handleChange={handleChange}
          value={subject}
        />
      </React.Fragment>
    );
  });

  return (
    <form onSubmit={handleSubmit} className="m-auto w-4/6">
      <p>Author</p>
      {authorInput}
      <div className="flex justify-center mt-4">
        <CustomButton
          click={() => addAuthor(selectedBook)}
          disable={disable.author}
          name="Add Author"
          color="bg-blue-600"
        />
        <CustomButton
          click={(e) => deleteLastAuthor(e, selectedBook)}
          name="Delete Author"
          color="bg-red-600"
        />
      </div>

      <p>BookShelves</p>
      {bookshelfInput}
      <div className="flex justify-center mt-4">
        <CustomButton
          click={() => addBookshelf(selectedBook)}
          disable={disable.bookshelves}
          name="Add Bookshelf"
          color="bg-blue-600"
        />
        <CustomButton
          click={(e) => deleteBookshelf(e, selectedBook)}
          color="bg-red-600"
          name="Delete Bookshelf"
        />
      </div>
      <Input
        label="Download Count"
        id="download_count"
        placeholder="Download Count"
        name={`download_count`}
        handleChange={handleChange}
        value={selectedBook.download_count}
      />
      <p>Languages</p>
      {languageInput}
      <div className="flex justify-center mt-4">
        <CustomButton
          click={() => addLanguage(selectedBook)}
          disable={disable.languages}
          name="Add Language"
          color="bg-blue-600"
        />
        <CustomButton
          click={(e) => deleteLanguage(e, selectedBook)}
          name="Delete Language"
          color="bg-red-600"
        />
      </div>
      <Input
        label="Media Type"
        id="media_type"
        placeholder="Media Type"
        name={`media_type`}
        handleChange={handleChange}
        value={selectedBook.media_type}
      />
      <p>subjects</p>
      {subjectInput}
      <div className="flex justify-center mt-4">
        <CustomButton
          click={() => addSubject(selectedBook)}
          disable={disable.subjects}
          name="Add Subject"
          color="bg-blue-600"
        />
        <CustomButton
          click={(e) => deleteSubject(e, selectedBook)}
          name="Delete Subject"
          color="bg-red-600"
        />
      </div>
      <Input
        label="Title"
        id="title"
        placeholder="Title"
        name={`title`}
        handleChange={handleChange}
        value={selectedBook.title}
      />
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
