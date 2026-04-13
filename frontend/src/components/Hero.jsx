import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import styles from './Hero.module.css';
import profileImg from '../assets/profile_img.png';

const Hero = () => {

  const handleDownloadResume = () => {
    window.open('http://localhost:8080/api/resumes/download', '_blank');
  };

  const handleMailClick = () => {
    window.location.href =
      "mailto:moulendramoulireddy@gmail.com?subject=Let's%20Connect&body=Hi%20Mouli,";
  };

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.greeting}>Hey there, I'm</span>
            <h1 className={styles.name}>
              Moulendra <span className="gradient-text">Reddy.</span>
            </h1>
            <h2 className={styles.title}>
              I build <span className={styles.typingEffect}>
                scalable, high-performance applications that solve real-world problems
              </span>.
            </h2>
            <p className={styles.description}>
              I'm a passionate Computer Science Engineering graduate specializing in Java Full Stack development,
              with a strong focus on designing robust backend systems and delivering seamless,
              user-centric digital experiences using modern technologies.
            </p>
          </motion.div>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView()}
            >
              View My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.placeholderImg}>
              <img src={profileImg} alt="Moulendra Reddy" className={styles.profilePic} />
            </div>

            <motion.div
              className={styles.orbit}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className={styles.planet}></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>Scroll Down</span>
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;