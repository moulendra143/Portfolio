import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiAward, FiStar, FiExternalLink, FiX } from 'react-icons/fi';
import Card from './Card';
import Loader from './Loader';
import api from '../services/api';
import styles from './Experience.module.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('Internships');
  const [experienceData, setExperienceData] = useState({
    Internships: [],
    Certifications: [],
    Achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [previewLink, setPreviewLink] = useState(null);

  const tabs = [
    { id: 'Internships', icon: <FiBriefcase /> },
    { id: 'Certifications', icon: <FiAward /> },
    { id: 'Achievements', icon: <FiStar /> }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intRes, certRes, achRes] = await Promise.all([
          api.get('/internships'),
          api.get('/certifications'),
          api.get('/achievements')
        ]);

        console.log("Internships API:", intRes.data); // 🔥 DEBUG

        setExperienceData({
          Internships: intRes.data,
          Certifications: certRes.data,
          Achievements: achRes.data
        });
      } catch (err) {
        console.error('Failed to fetch experience data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FIXED HANDLER
  const handlePreview = (item) => {
    const link = item.link || item.file || item.url; // 🔥 fallback

    if (!link) {
      console.warn("Missing link for item:", item);
      alert("No document uploaded yet");
      return;
    }

    console.log("Opening:", link); // 🔥 DEBUG
    setPreviewLink(link);
  };

  const closePreview = () => {
    setPreviewLink(null);
  };

  return (
    <section id="experience" className={styles.expSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
        </motion.div>

        <div className={styles.expContainer}>
          <div className={styles.tabsVertical}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabText}>{tab.id}</span>
              </button>
            ))}
          </div>

          <div className={styles.contentArea}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                <Loader />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.timeline}
                >
                  {experienceData[activeTab] && experienceData[activeTab].length > 0 ? (
                    experienceData[activeTab].map((item, index) => (
                      <div key={item.id || index} className={styles.timelineItem}>
                        <div className={styles.timelineDot}></div>

                        <Card className={styles.timelineCard} hoverEffect={true}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className={styles.itemTitle}>
                              {item.title || item.name || item.role}
                            </h3>

                            {/* 🔥 FIXED CLICK */}
                            {(activeTab === 'Internships' || activeTab === 'Certifications') && (
                              <FiExternalLink
                                size={18}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handlePreview(item)}
                              />
                            )}
                          </div>

                          <div className={styles.itemSub}>
                            <span className={styles.itemOrg}>
                              {item.organization || item.company || item.issuer}
                            </span>
                            <span className={styles.itemDate}>
                              {item.date || item.duration}
                            </span>
                          </div>

                          <ul className={styles.itemDesc}>
                            {item.description
                              ?.split(/\d+\.\s/)
                              .filter(Boolean)
                              .map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                          </ul>
                        </Card>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
                      No {activeTab.toLowerCase()} found.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODAL */}
      {previewLink && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={closeBtn} onClick={closePreview}>
              <FiX size={20} />
            </div>

            <iframe
              src={previewLink}
              title="Preview"
              width="100%"
              height="500px"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;


// ✅ STYLES
const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  width: '80%',
  background: '#111',
  borderRadius: '10px',
  padding: '1rem',
  position: 'relative'
};

const closeBtn = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  color: '#fff'
};