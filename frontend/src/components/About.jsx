import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Card from './Card';
import { FiCode, FiCpu, FiDatabase, FiAward } from 'react-icons/fi';
import styles from './About.module.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const highlights = [
    { icon: <FiCode />, title: 'Java Full Stack', desc: 'Building E2E scalable applications' },
    { icon: <FiCpu />, title: 'Frontend', desc: 'React frontend development' },
    { icon: <FiDatabase />, title: 'Backend', desc: 'Spring Boot, Java, MySQL' },
    { icon: <FiAward />, title: 'Problem Solving', desc: 'Strong DSA foundation' }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.paragraph}>
              Hello! I'm Moulendra Reddy, a Computer Science Engineering graduate with a strong foundation in core computer science concepts and a deep passion for building scalable, real-world applications.

            </p>
            <p className={styles.paragraph}>
             My journey began with Core Java, which sparked my interest in understanding how powerful backend systems are designed. Over time, I evolved into a full-stack developer, focusing on creating end-to-end applications that are both technically robust and user-friendly.
            </p>
            <p className={styles.paragraph}>
             I specialize in developing solutions at the intersection of Spring Boot backend architectures and modern React interfaces, ensuring performance, scalability, and a seamless user experience. I’m particularly interested in building products that are not only efficient but also accessible and impactful.
            </p>
            

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1+</span>
                <span className={styles.statLabel}>Years Coding</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>6+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Hackathons</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.cardsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {highlights.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={styles.highlightCard}>
                  <div className={styles.iconWrapper}>
                    {item.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
