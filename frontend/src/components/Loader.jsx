import React from 'react';
import styles from './Loader.module.css';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen ? styles.fullScreen : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.spinner}>
        <motion.div
          className={styles.circle}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className={styles.innerCircle}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
