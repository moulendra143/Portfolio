import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbar}`}>
        <NavLink to="/" className={styles.logo}>
          <span className="gradient-text">MR.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navItems}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Socials */}
        <div className={styles.socials}>
          <a href="https://github.com/moulendra143" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiGithub /></a>
          <a href="https://www.linkedin.com/in/moulendra-reddy-1b2966335/" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiLinkedin /></a>
          <a href="mailto:moulendramoulireddy@gmail.com" className={styles.socialIcon}><FiMail /></a>
        </div>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.mobileNav}
          >
            <ul className={styles.mobileNavItems}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className={styles.mobileSocials}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiLinkedin /></a>
              <a href="mailto:contact@example.com" className={styles.socialIcon}><FiMail /></a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
