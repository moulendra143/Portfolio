import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiBook, FiCode } from 'react-icons/fi';
import Card from './Card';
import styles from './GithubStats.module.css';
import api from '../services/api';

const GithubStats = () => {
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    topLanguage: 'Loading...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/github/repos');
        const reposData = res.data;
        
        let totalStars = 0;
        let totalForks = 0;
        const languageMap = {};

        reposData.forEach(repo => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
          if (repo.language) {
            languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
          }
        });

        let topLang = 'None';
        let maxCount = 0;
        for (const [lang, count] of Object.entries(languageMap)) {
          if (count > maxCount) {
            maxCount = count;
            topLang = lang;
          }
        }

        setStats({
          repos: reposData.length,
          stars: totalStars,
          forks: totalForks,
          topLanguage: topLang
        });
      } catch (err) {
        console.error('Error fetching github stats:', err);
        setStats({ repos: '?', stars: '?', forks: '?', topLanguage: '?' });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="github" className={styles.githubSection}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Open <span className="gradient-text">Source</span>
          </h2>
        </motion.div>

        <div className={styles.statsContainer}>

          {/* Card 1: Total Repositories */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className={styles.customStatCard}>
              <div className={styles.statIconWrapper}><FiBook /></div>
              <div className={styles.statInfo}>
                <h3>{loading ? '...' : stats.repos}</h3>
                <p>Public Repositories</p>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Total Stars */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className={styles.customStatCard}>
              <div className={styles.statIconWrapper}><FiStar /></div>
              <div className={styles.statInfo}>
                <h3>{loading ? '...' : stats.stars}</h3>
                <p>Total Stars Earned</p>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Total Forks */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className={styles.customStatCard}>
              <div className={styles.statIconWrapper}><FiGitBranch /></div>
              <div className={styles.statInfo}>
                <h3>{loading ? '...' : stats.forks}</h3>
                <p>Total Forks Created</p>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Top Language */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.5, delay: 0.4 }}>
            <Card className={styles.customStatCard}>
              <div className={styles.statIconWrapper}><FiCode /></div>
              <div className={styles.statInfo}>
                <h3>{loading ? '...' : stats.topLanguage}</h3>
                <p>Most Used Language</p>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GithubStats;