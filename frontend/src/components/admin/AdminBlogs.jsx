import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', summary: '', content: '', date: '', readTime: '', tag: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, formData);
      } else {
        await api.post('/blogs', formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ title: '', summary: '', content: '', date: '', readTime: '', tag: '' });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setLoading(true);
      try {
        await api.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  if (loading && blogs.length === 0) return <Loader />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Manage Blogs</h2>
        <Button variant="primary" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setFormData({ title: '', summary: '', content: '', date: '', readTime: '', tag: '' }); }}>
          <FiPlus /> {isFormOpen ? 'Close Form' : 'Add Blog'}
        </Button>
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <Input id="title" label="Title" value={formData.title || ''} onChange={handleInputChange} required />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <Input id="summary" label="Summary" type="textarea" value={formData.summary || ''} onChange={handleInputChange} required />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <Input id="content" label="Content (HTML / Markdown supported text)" type="textarea" value={formData.content || ''} onChange={handleInputChange} style={{ minHeight: '150px' }} />
              </div>
              <Input id="date" label="Date (e.g. Aug 15, 2025)" value={formData.date || ''} onChange={handleInputChange} required />
              <Input id="readTime" label="Read Time (e.g. 5 min read)" value={formData.readTime || ''} onChange={handleInputChange} />
              <Input id="tag" label="Tag (e.g. Backend)" value={formData.tag || ''} onChange={handleInputChange} />
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              {editingId ? 'Update Blog' : 'Save Blog'}
            </Button>
          </form>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {blogs.map(blog => (
          <Card key={blog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} hoverEffect={false}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{blog.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '4px' }}>{blog.tag || 'Article'}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{blog.date}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                <FiEdit2 />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
        {blogs.length === 0 && !loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No blogs found. Add one above.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
