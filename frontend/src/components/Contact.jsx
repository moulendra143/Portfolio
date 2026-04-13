import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import Input from './Input';
import Button from './Button';
import Card from './Card';
import api from '../services/api';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Failed to send message', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        </motion.div>

        <div className={styles.contactContainer}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about your project</h3>
            <p className={styles.description}>
              Whether you have a question, a project proposal, or just want to say hi,
              I'll try my best to get back to you!
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><FiMail /></div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:moulendramoulireddy@gmail.com">moulendramoulireddy@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><FiPhone /></div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+918106964421">+91 8106964421</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><FiMapPin /></div>
                <div>
                  <h4>Location</h4>
                  <span>Andhra Pradesh, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.contactFormWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className={styles.formCard} hoverEffect={false}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                  label="Name"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Message"
                  id="message"
                  type="textarea"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  isFullWidth
                  disabled={status === 'sending'}
                  className={styles.submitBtn}
                >
                  {status === 'sending' ? 'Sending...' : (
                    <>
                      Send Message <FiSend className={styles.sendIcon} />
                    </>
                  )}
                </Button>

                {status === 'success' && (
                  <motion.p
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Your message has been sent successfully!
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
