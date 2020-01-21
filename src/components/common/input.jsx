import React from "react";

const Input = ({
  inputId,
  inputClass,
  inputType,
  labelContent,
  error,
  value,
  onChange,
  name,
  ...rest
}) => {
  return (
    <React.Fragment>
      <label htmlFor={inputId}>{labelContent} </label>
      <div className={inputClass}>
        <input
          name={name || ""}
          type={inputType || "text"}
          id={inputId}
          className={inputClass}
          value={value}
          onChange={onChange}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </React.Fragment>
  );
};

export default Input;
