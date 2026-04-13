import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Loader from './Loader';
import styles from './Skills.module.css';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [skillsData, setSkillsData] = useState({});
  const [loading, setLoading] = useState(true);

  const skillCategories = ['Frontend', 'Backend', 'Database', 'CS Fundamentals', 'AI','Tools'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        const grouped = {
          'Frontend': [],
          'Backend': [],
          'AI & ML': [],
          'Tools': []
        };

        res.data.forEach(skill => {
          if (grouped[skill.category]) {
            grouped[skill.category].push(skill);
          } else {
            grouped[skill.category] = [skill];
          }
        });

        setSkillsData(grouped);
      } catch (err) {
        console.error('Failed to fetch skills', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
        </motion.div>

        <div className={styles.skillsContainer}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {skillCategories.map((category) => (
              <button
                key={category}
                className={`${styles.tabBtn} ${activeTab === category ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <div className={styles.skillsList}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <Loader />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.skillGrid}
                >
                  {skillsData[activeTab] && skillsData[activeTab].length > 0 ? (
                    skillsData[activeTab].map((skill, index) => (
                      <div key={skill.id || index} className={styles.skillItem}>
                        <div className={styles.skillInfo}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className={styles.skillName}>{skill.name}</span>
                          </div>
                          <span className={styles.skillPercentage}>{skill.percentage}%</span>
                        </div>
                        <div className={styles.progressBarBg}>
                          <motion.div
                            className={styles.progressBarFill}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0', gridColumn: '1 / -1' }}>
                      No skills found in this category.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
