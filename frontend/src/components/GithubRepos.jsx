import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch } from 'react-icons/fi';
import Card from './Card';
import styles from './GithubRepos.module.css';
import api from '../services/api';
import Loader from './Loader';

const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await api.get('/github/repos');
        // Sort by stars and take top ones if needed, or just show all
        const sortedRepos = res.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
      } catch (err) {
        console.error('Error fetching github repos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section className={styles.reposSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.subtitle}>Recent <span className="gradient-text">Repositories</span></h3>
        </motion.div>

        {loading ? (
          <div className={styles.loaderCenter}>
            <Loader />
          </div>
        ) : (
          <div className={styles.reposGrid}>
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={styles.repoCard} hoverEffect={true}>
                  <div className={styles.repoContent}>
                    <div className={styles.repoHeader}>
                      <FiGithub className={styles.repoIcon} />
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.repoName}>
                        {repo.name}
                      </a>
                    </div>
                    <p className={styles.repoDesc}>
                      {repo.description || "No description provided."}
                    </p>
                    <div className={styles.repoFooter}>
                      <div className={styles.repoStats}>
                        <span className={styles.statItem}>
                          <FiStar /> {repo.stargazers_count}
                        </span>
                        <span className={styles.statItem}>
                          <FiGitBranch /> {repo.forks_count}
                        </span>
                      </div>
                      {repo.language && (
                        <span className={styles.repoLanguage}>{repo.language}</span>
                      )}
                    </div>
                    <div className={styles.repoDate}>
                      Updated on {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GithubRepos;
