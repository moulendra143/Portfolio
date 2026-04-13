import React from 'react';
import styles from './Button.module.css';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isFullWidth,
  onClick,
  type = 'button',
  disabled,
  className = ''
}) => {
  const baseClasses = `${styles.btn} ${styles[variant]} ${styles[size]} ${isFullWidth ? styles.fullWidth : ''} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
