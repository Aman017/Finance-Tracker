import React from 'react';
import './styles.css';

const Button = ({ text, onClick, blue, disabled,  type = "button" }) => {
  return (
    <button
    style={{fontSize: '0.8rem', width: '100%'}}
      type={type}  // allows "submit" to work with forms
      onClick={onClick}
      className={blue ? "btn btn-blue" : "btn"}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
