import React from "react";

import "./Button.css";
const Button = ({ type, value, className, clickHandler, disabled = false }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
