import React, { useContext } from "react";

import { AppContext } from "../../../AppContext.jsx";
import { Select } from "../../forms/Forms.jsx";

const SelectBookForm = ({ handleSubmit, handleChange }) => {
  const { subject, material } = useContext(AppContext);
  return (
    <>
      <h2 className="flex justify-center mb-4 text-3xl">My Book List</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <Select
            name="subject"
            options={subject.list}
            handleChange={handleChange}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Select
            name="material"
            options={material.list}
            handleChange={handleChange}
            disabled={subject.value === "" || subject.value === "default"}
          />
        </div>
        <div className="flex justify-center mt-4">
          {material.value === "" || subject.value === "" ? (
            <button
              disabled={material.value === "" || subject.value === ""}
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
            >
              Choose
            </button>
          ) : (
            <button
              disabled={material.value === "" || subject.value === ""}
              type="submit"
              className="transition duration-500 ease-in-out bg-blue-600 hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded disabled:transition-opacity disabled:opacity-75 disabled:bg-grey-100"
            >
              Choose
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default SelectBookForm;
