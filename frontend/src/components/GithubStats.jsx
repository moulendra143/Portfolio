import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import styles from './GithubStats.module.css';

const GithubStats = () => {
  const username = 'moulendra143';

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

          {/* 🔥 OVERVIEW */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=github_dark`}
              alt="GitHub Overview"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 STATS */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=github_dark`}
              alt="GitHub Stats"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 LANGUAGES */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=github_dark`}
              alt="Languages"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 MOST USED LANGUAGES */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=github_dark`}
              alt="Top Languages"
              className={styles.statImage}
            />
          </Card>

        </div>
      </div>
    </section>
  );
};

export default GithubStats;