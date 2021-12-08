import React, { Fragment } from 'react';

import './Input.css';

const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  placeholder,
  handleChange,
  className,
  required,
}) => {
  return (
    <div className='form-group'>
      {label && (
        <label className={className} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default Input;
