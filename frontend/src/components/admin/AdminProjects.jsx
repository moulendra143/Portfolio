import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubLink: '', liveLink: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
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
        await api.put(`/projects/${editingId}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project. Please check your inputs and try again.');
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLoading(true);
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  if (loading && projects.length === 0) return <Loader />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Manage Projects</h2>
        <Button variant="primary" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' }); }}>
          <FiPlus /> {isFormOpen ? 'Close Form' : 'Add Project'}
        </Button>
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input id="title" label="Title" value={formData.title} onChange={handleInputChange} required />
              <div style={{ gridColumn: 'span 2' }}>
                <Input id="description" label="Description" type="textarea" value={formData.description} onChange={handleInputChange} required />
              </div>
              <Input id="techStack" label="Tech Stack (comma separated)" value={formData.techStack} onChange={handleInputChange} required />
              <Input id="githubLink" label="GitHub Link (Optional)" value={formData.githubLink} onChange={handleInputChange} />
              <Input id="liveLink" label="Live Link (Optional)" value={formData.liveLink} onChange={handleInputChange} />
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              {editingId ? 'Update Project' : 'Save Project'}
            </Button>
          </form>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map(project => (
          <Card key={project.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} hoverEffect={false}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{project.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{project.techStack}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                <FiEdit2 />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
        {projects.length === 0 && !loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No projects found. Add one above.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
