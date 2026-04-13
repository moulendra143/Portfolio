import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Card from './Card';
import styles from './Projects.module.css';

import api from '../services/api';
import Loader from './Loader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <Loader />
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className={styles.projectCard} hoverEffect={true}>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <ul className={styles.projectDesc}>
                      {project.description
                        ?.split(/\d+\.\s/)
                        .filter(Boolean)
                        .map((point, i) => (
                          <li key={i}>{point.trim()}</li>
                        ))}
                    </ul>

                    <div className={styles.techStack}>
                      {project.techStack?.split(',').map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech.trim()}</span>
                      ))}
                    </div>

                    <div className={styles.links} style={{ marginTop: '1.5rem' }}>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className={styles.iconLink}>
                          <FiGithub />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles.iconLink}>
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>No projects available yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
