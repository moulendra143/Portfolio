import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Card from './Card';
import Loader from './Loader';
import api from '../services/api';
import styles from './Blog.module.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className={styles.blogSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Latest <span className="gradient-text">Articles</span></h2>
            <button className={styles.viewAllBtn}>
              View All <FiArrowRight />
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <Loader />
          </div>
        ) : (
          <div className={styles.blogGrid}>
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className={styles.blogCard} hoverEffect={true}>
                  <div className={styles.tag}>{blog.tag || 'Article'}</div>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogSummary}>{blog.summary}</p>
                  <div className={styles.blogFooter}>
                    <span className={styles.blogMeta}>{blog.date} • {blog.readTime || '5 min read'}</span>
                    <a href={`/blog/${blog.id}`} className={styles.readMore}>Read Article</a>
                  </div>
                </Card>
              </motion.div>
            ))}
            {blogs.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                No articles published yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
