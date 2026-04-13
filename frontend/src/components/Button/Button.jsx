import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '', href }) => {
  const btnClass = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={btnClass}
        >
          {children}
        </motion.a>
      );
    }
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      type={type} 
      onClick={onClick} 
      className={btnClass}
    >
      {children}
    </motion.button>
  );
};

export default Button;
