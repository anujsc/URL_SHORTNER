import React from 'react';
import './Button.css';
import { FaArrowRight } from 'react-icons/fa';

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, icon, ...props }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="btn-content">
        {children}
        {icon !== undefined ? (
          icon && <span className="btn-icon">{icon}</span>
        ) : (
          <span className="btn-icon"><FaArrowRight /></span>
        )}
      </span>
    </button>
  );
};

export default Button;
