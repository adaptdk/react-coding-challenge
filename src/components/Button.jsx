import React from "react";

const CustomButton = ({ click, disable, name, color }) => {
  return disable ? (
    <button
      onClick={click}
      disabled={disable}
      type="submit"
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed m-2"
    >
      {name}
    </button>
  ) : (
    <button
      onClick={click}
      type="submit"
      className={`transition duration-500 ease-in-out ${color} hover:${color} transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded m-2`}
    >
      {name}
    </button>
  );
};
export default CustomButton;
