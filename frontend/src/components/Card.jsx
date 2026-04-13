import React from 'react';
import styles from './Card.module.css';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true, onClick }) => {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
