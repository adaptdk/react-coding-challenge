import React, { useContext } from "react";

import { AppContext } from "../../../AppContext.jsx";
import { useHistory } from "react-router-dom";
import Book from "../edit/EditBook.jsx";
import SelectBookForm from "./SelectBookForm.jsx";
import CustomButton from "../../Button.jsx";
const SelectBook = () => {
  const history = useHistory();

  const {
    subject,
    material,
    setSubject,
    setMaterial,
    chooseBook,
    book,
    show,
    addNewBook,
    setShow,
  } = useContext(AppContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "subject") {
      setSubject({ ...subject, value: value });
    } else {
      setMaterial({ ...material, value: value });
      chooseBook(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setShow({ ...show, form: true, newBookButton: false });
    history.push(`/${book.id}`);
  };

  console.log(show.newBookButton);

  return (
    <>
      <SelectBookForm handleSubmit={handleSubmit} handleChange={handleChange} />
      {show.newBookButton && (
        <div className="flex justify-center mt-4">
          <CustomButton
            click={addNewBook}
            name="Add New Book"
            color="bg-green-600"
          />
        </div>
      )}

      {show.form && <Book />}
    </>
  );
};

export default SelectBook;
