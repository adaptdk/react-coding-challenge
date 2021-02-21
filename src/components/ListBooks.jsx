/* ========== DEPENDENCIES ============= */
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
/* ============ COMPONENTS ============== */
import { BookInfo } from "comp/BookInfo";
/* ============ CODE ============== */

export const ListBooks = () => {
  const [InfoModalId, setInfoModalId] = useState(undefined);
  const openInfoModal = (id) => {
    setInfoModalId(id);
  };
  const closeInfoModal = () => {
    setInfoModalId(undefined);
  };
  const { data, error, loading } = useSelector((state) => {
    return state.books;
  });
  return (
    <section className="books">
      <h3 className="books__heading">Books by Subject</h3>
      {error && <h3 className="books__heading--error">{error}</h3>}
      {loading && <h3 className="books__heading--loading">Loading...</h3>}
      <ul className="book__ul">
        {!error &&
          !loading &&
          data.map((item) => {
            return (
              <Fragment key={item.id}>
                <li className="books__li">
                  <span
                    className="books__txt"
                    onClick={() => openInfoModal(item.id)}>
                    {item.title}
                  </span>
                </li>
                <BookInfo
                  title={item.title}
                  openInfoModal={InfoModalId === item.id}
                  closeInfoModal={closeInfoModal}
                  bookId={item.id}
                  bookTitle={item.title}
                  authorsName={item.authors[0].name}
                  yearOfBirth={item.authors[0].birth_year}
                  yearOfDeath={item.authors[0].death_year}
                  bookshelvesLength={item.bookshelves.length}
                  bookshelves1={item.bookshelves[0]}
                  bookshelves2={item.bookshelves[1]}
                  formats={item.formats}
                  downloadCount={item.download_count}
                  languages={item.languages[0]}
                  mediaType={item.media_type}
                />
              </Fragment>
            );
          })}
      </ul>
    </section>
  );
};
