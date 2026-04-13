import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import Button from '../components/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.content}
      >
        <h1 className={styles.errorCode}>404</h1>
        <div className={styles.glitchContainer}>
          <h2 className={styles.errorMessage} data-text="PAGE NOT FOUND">PAGE NOT FOUND</h2>
        </div>
        <p className={styles.description}>
          The digital realm you are looking for has been moved, deleted, or never existed in this timeline.
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => navigate('/')}
        >
          <FiHome style={{ marginRight: '8px' }} /> Return to Base
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
