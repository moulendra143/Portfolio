import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ 
  label, 
  id, 
  error, 
  type = 'text', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          id={id}
          ref={ref}
          className={`${styles.input} ${styles.textarea} ${error ? styles.errorInput : ''}`}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          ref={ref}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          {...props}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
