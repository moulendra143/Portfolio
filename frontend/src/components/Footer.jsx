import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className="gradient-text">MR.</span>
            <p className={styles.description}>
              Building the future with Java, Spring Boot, and scalable web applications.
            </p>
          </div>
          <div className={styles.links}>
            <p>&copy; {currentYear} Moulendra Reddy.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
