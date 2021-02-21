/* ========== DEPENDENCIES ============= */
import React, { useState } from "react";
import { useActions } from "hooks/useActions";
/* ============ CODE ============== */

export const ChooseBook = () => {
  const [subject, setSubject] = useState("");
  const { searchBooks } = useActions();
  const onChange = (e) => {
    setSubject(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    searchBooks(subject);
  };
  return (
    <section className="choose-book">
      <h3 className="choose-book__heading">Choose your book by subject</h3>
      <form className="choose-book__form" onSubmit={onSubmit}>
        <select
          className="choose-book__select"
          type="text"
          name="option"
          onChange={onChange}>
          <option value="">Choose subject...</option>
          <option value="Science">Science</option>
          <option value="Fiction">Fiction</option>
        </select>
        <button type="submit" className="choose-book__submit">
          Search
        </button>
      </form>
    </section>
  );
};
