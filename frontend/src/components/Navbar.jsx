import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isHome) {
        const sections = ['about', 'skills', 'projects', 'contact'];
        let current = 'Home';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the section top is above a third of the screen, it is active
            if (rect.top <= window.innerHeight / 3) {
              current = section.charAt(0).toUpperCase() + section.slice(1);
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (e, link) => {
    if (isHome) {
      e.preventDefault();
      if (link.name === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const sectionId = link.name.toLowerCase();
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80; // Navbar height
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback if section not found on home page (e.g. they modified Home.jsx)
          navigate(link.path);
        }
      }
      setIsOpen(false);
    } else {
      // Allow default NavLink routing if not on home page
      setIsOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbar}`}>
        <NavLink to="/" className={styles.logo} onClick={(e) => handleNavClick(e, {name: 'Home'})}>
          <span className="gradient-text">MR.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navItems}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={({ isActive }) => {
                    const isActuallyActive = isHome ? activeSection === link.name : isActive;
                    return `${styles.navLink} ${isActuallyActive ? styles.active : ''}`;
                  }}
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
                    onClick={(e) => handleNavClick(e, link)}
                    className={({ isActive }) => {
                      const isActuallyActive = isHome ? activeSection === link.name : isActive;
                      return `${styles.mobileNavLink} ${isActuallyActive ? styles.active : ''}`;
                    }}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className={styles.mobileSocials}>
              <a href="https://github.com/moulendra143" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiGithub /></a>
              <a href="https://www.linkedin.com/in/moulendra-reddy-1b2966335/" target="_blank" rel="noreferrer" className={styles.socialIcon}><FiLinkedin /></a>
              <a href="mailto:moulendramoulireddy@gmail.com" className={styles.socialIcon}><FiMail /></a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
