/* ========== DEPENDENCIES ============= */
import React, { useState } from "react";
import Modal from "react-modal";
/* ============ CODE ============== */
export const BookInfo = ({
  title,
  openInfoModal,
  closeInfoModal,
  bookId,
  bookTitle,
  authorsName,
  yearOfBirth,
  yearOfDeath,
  bookshelvesLength,
  bookshelves1,
  bookshelves2,
  formats,
  downloadCount,
  languages,
  mediaType,
}) => {
  const [bookInfo, setBookIndo] = useState({
    authorsName: authorsName || "Not Specified",
    yearOfBirth: yearOfBirth || "Not Specified",
    yearOfDeath: yearOfDeath || "Not Specified",
    bookshelves1: bookshelves1 || "Not Specified",
    bookshelves2: bookshelves2 || "Not Specified",
    downloadCount: downloadCount || "Not Specified",
    languages: languages || "Not Specified",
    mediaType: mediaType || "Not Specified",
  });
  const [formatsEntries, setFormatsEntries] = useState(formats);

  const updateFormatsEntries = (e) => {
    setFormatsEntries({
      ...formatsEntries,
      [e.target.name]: e.target.value,
    });
  };
  const onChange = (e) => {
    setBookIndo({
      ...bookInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal
      isOpen={openInfoModal}
      onRequestClose={closeInfoModal}
      contentLabel={bookTitle}
      closeTimeoutMS={800}
      className="info-modal"
      key={bookId}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, .75)",
        },
        content: {
          color: "lightsteelblue",
        },
      }}
      ariaHideApp={false}>
      <article className="book-info">
        <div className="book-info__topbar">
          <h3 className="book-info__heading">Book Info for "{title}"</h3>
          <button className="book-info__close-btn" onClick={closeInfoModal}>
            X
          </button>
        </div>
        <form className="book-info__form">
          {/* ========= AUTHOR DETAILS ========== */}
          <fieldset className="book-info__fieldset">
            <legend className="book-info__legend">AUTHOR DETAILS</legend>
            <label className="book-info__label">
              Author:
              <input
                className="book-info__input"
                type="text"
                name="authorsName"
                value={bookInfo.authorsName}
                onChange={onChange}
              />{" "}
            </label>
            <label className="book-info__label">
              Year of Birth:
              <input
                className="book-info__input"
                type="number"
                name="yearOfBirth"
                value={bookInfo.yearOfBirth}
                onChange={onChange}
              />{" "}
            </label>
            <label className="book-info__label">
              Year of Death:
              <input
                className="book-info__input"
                type="number"
                name="yearOfDeath"
                value={bookInfo.yearOfDeath}
                onChange={onChange}
              />{" "}
            </label>
          </fieldset>
          {/* ========= BOOKSHELVES ========== */}
          <fieldset className="book-info__fieldset">
            <legend className="book-info__legend">BOOKSHELVES</legend>
            <label className="book-info__label">
              Bookshelve 1:
              <input
                className="book-info__input"
                type="text"
                name="bookshelves1"
                value={bookInfo.bookshelves1}
                onChange={onChange}
              />{" "}
            </label>
            {bookshelvesLength > 1 && (
              <label className="book-info__label">
                Bookshelve 2:
                <input
                  className="book-info__input"
                  type="text"
                  name="bookshelves2"
                  value={bookInfo.bookshelves2}
                  onChange={onChange}
                />{" "}
              </label>
            )}
          </fieldset>
          {/* ========= FORMATS ========== */}
          <fieldset className="book-info__fieldset">
            <legend className="book-info__legend">FORMATS</legend>
            {Object.entries(formats).map(([key, value]) => {
              return (
                <label key={key} className="book-info__label">
                  {key}
                  <input
                    className="book-info__input"
                    type="text"
                    name={key}
                    value={formatsEntries[key]}
                    onChange={updateFormatsEntries}
                  />{" "}
                </label>
              );
            })}
          </fieldset>
          {/* ========= OTHER INFO ========== */}
          <fieldset className="book-info__fieldset">
            <legend className="book-info__legend">OTHER INFO</legend>
            <label className="book-info__label">
              Download Count:
              <input
                className="book-info__input"
                type="number"
                name="downloadCount"
                value={bookInfo.downloadCount}
                onChange={onChange}
              />{" "}
            </label>
            <label className="book-info__label">
              Labguages:
              <input
                className="book-info__input"
                type="text"
                name="languages"
                value={bookInfo.languages}
                onChange={onChange}
              />{" "}
            </label>
            <label className="book-info__label">
              Media Type:
              <input
                className="book-info__input"
                type="text"
                name="mediaType"
                value={bookInfo.mediaType}
                onChange={onChange}
              />{" "}
            </label>
          </fieldset>
          <button
            type="button"
            className="book-info__save-btn"
            onClick={closeInfoModal}>
            Save
          </button>
        </form>
      </article>
    </Modal>
  );
};
