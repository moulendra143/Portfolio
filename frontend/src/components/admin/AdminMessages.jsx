import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Loader from '../Loader';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setLoading(true);
      try {
        await api.delete(`/contact/${id}`);
        fetchMessages();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  if (loading && messages.length === 0) return <Loader />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Contact Messages</h2>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {messages.map(msg => (
          <Card key={msg.id} style={{ display: 'flex', flexDirection: 'column' }} hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{msg.name}</h3>
                <a href={`mailto:${msg.email}`} style={{ color: 'var(--cyan)', fontSize: '0.9rem', textDecoration: 'none' }}>{msg.email}</a>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDelete(msg.id)} style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.25rem 0.5rem' }}>
                <FiTrash2 />
              </Button>
            </div>
            
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', flex: 1 }}>
              {msg.message}
            </p>
          </Card>
        ))}
        {messages.length === 0 && !loading && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>No messages received yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
