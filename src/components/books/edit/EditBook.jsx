import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../../../AppContext.jsx";
import { useHistory, useLocation } from "react-router-dom";
import EditBookForm from "./EditBookForm.jsx";
import objectHelper from "../../../helpers/object";
import axios from "axios";

const initialState = {
  authors: [
    {
      birth_year: "",
      death_year: "",
      name: "",
    },
  ],
  bookshelves: [""],
  download_count: "",
  formats: {},
  languages: [""],
  media_type: "",
  subjects: [""],
  title: "",
};

const Book = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    book,
    disable,
    setDisable,
    setSubject,
    setMaterial,
    show,
    method,
    setShow,
    subject,
    material,
  } = useContext(AppContext);
  const id = location.pathname.split("/")[1];
  const [myBook, setMyBook] = useState(id ? book : initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyBook(objectHelper.setValueByPath(myBook, name, value));

    if (name.includes("authors")) setDisable({ ...disable, author: false });
    if (name.includes("bookshelves"))
      setDisable({ ...disable, bookshelves: false });
    if (name.includes("languages"))
      setDisable({ ...disable, languages: false });
    if (name.includes("subjects")) setDisable({ ...disable, subjects: false });
  };

  useEffect(() => {
    if (id) {
      setMyBook(book);
    } else {
      setMyBook(initialState);
    }
  }, [location.pathname, book]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios[method](`http://localhost:3010/books/${id}`, myBook).then(() => {
      setSubject({ ...subject, value: "default" });
      setMaterial({ ...material, value: "default" });
      setShow({ ...show, form: false });
      history.push("/");
    });
  };

  return (
    <EditBookForm
      selectedBook={myBook}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      disable={disable}
    />
  );
};

export default Book;
