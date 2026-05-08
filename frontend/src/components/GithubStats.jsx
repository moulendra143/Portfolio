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

          {/* 🔥 CONTRIBUTION GRAPH */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight`}
              alt="GitHub Stats Overview"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 TOP LANGUAGES */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_progress=true`}
              alt="Top Languages Detail"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 OVERVIEW */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=github_dark`}
              alt="GitHub Overview"
              className={styles.statImage}
            />
          </Card>

          {/* 🔥 REPOS PER LANGUAGE */}
          <Card className={styles.statsCard}>
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=github_dark`}
              alt="Languages"
              className={styles.statImage}
            />
          </Card>

        </div>
      </div>
    </section>
  );
};

export default GithubStats;