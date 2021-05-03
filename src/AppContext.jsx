import React, { createContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[1];
  const [subject, setSubject] = useState({
    list: [],
    value: "",
  });
  const [material, setMaterial] = useState({
    list: [],
    value: "",
  });
  const [disable, setDisable] = useState({
    author: false,
    bookshelves: false,
    languages: false,
    subjects: false,
  });
  const [show, setShow] = useState({
    form: false,
    newBookButton: true,
  });
  const [method, setMethod] = useState("patch");
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/subjects")
      .then((res) => setSubject({ ...subject, list: res.data }));
  }, []);

  useEffect(() => {
    if (subject.value || subject.value !== "default") {
      axios
        .get(`http://localhost:3010/books?subjects_like=${subject.value}`)
        .then((res) => {
          const title = res.data.map((val) => val.title);
          setBooks(res.data);
          setMaterial({ ...material, list: title });
        });
    }
  }, [subject.value]);

  useEffect(() => {
    if (id) {
      setShow({ ...show, newBookButton: false });
      setMethod("patch");
    } else {
      setShow({ ...show, newBookButton: true });
      setMethod("post");
    }
  }, [location.pathname]);

  const chooseBook = (value) => {
    let selectedBook = books.find((val) => val.title === value);
    setBook(selectedBook);
  };

  const addAuthor = (book) => {
    let newAuthorsArr = [
      ...book.authors,
      {
        birth_year: "",
        death_year: "",
        name: "",
      },
    ];
    setBook({ ...book, authors: newAuthorsArr });
    setDisable({ ...disable, author: true });
  };

  const deleteLastAuthor = (e, book) => {
    e.preventDefault();
    let newAuhorsArr = book.authors;
    newAuhorsArr.pop();

    setBook({ ...book, authors: newAuhorsArr });
  };

  const addBookshelf = (book) => {
    let newBookshelf = [...book.bookshelves, ""];
    setBook({ ...book, bookshelves: newBookshelf });
    setDisable({ ...disable, bookshelves: true });
  };

  const deleteBookshelf = (e, book) => {
    e.preventDefault();
    let newBookshelf = book.bookshelves;

    newBookshelf.pop();
    setBook({ ...book, bookshelves: newBookshelf });
  };

  const addLanguage = (book) => {
    let newLanguageArr = [...book.languages, ""];
    setBook({ ...book, languages: newLanguageArr });
    setDisable({ ...disable, languages: true });
  };

  const deleteLanguage = (e, book) => {
    e.preventDefault();
    let newLanguageArr = book.languages;

    newLanguageArr.pop();
    setBook({ ...book, languages: newLanguageArr });
  };

  const addSubject = (book) => {
    let newSubject = [...book.subjects, ""];
    setBook({ ...book, subjects: newSubject });
    setDisable({ ...disable, subjects: true });
  };

  const deleteSubject = (e, book) => {
    e.preventDefault();
    let newSubjectArr = book.subjects;

    newSubjectArr.pop();
    setBook({ ...book, subjects: newSubjectArr });
  };

  const addNewBook = () => {
    setShow({ ...show, form: true });
    setMethod("post");
  };

  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        disable,
        setDisable,
        addAuthor,
        addBookshelf,
        addLanguage,
        addSubject,
        subject,
        setSubject,
        material,
        setMaterial,
        chooseBook,
        book,
        addNewBook,
        method,
        setMethod,
        deleteLastAuthor,
        deleteBookshelf,
        deleteLanguage,
        deleteSubject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
