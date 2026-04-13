import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Frontend', percentage: 50
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
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
        await api.put(`/skills/${editingId}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', category: 'Frontend', percentage: 50 });
      fetchSkills();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setEditingId(skill.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setLoading(true);
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  if (loading && skills.length === 0) return <Loader />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Manage Skills</h2>
        <Button variant="primary" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setFormData({ name: '', category: 'Frontend', percentage: 50 }); }}>
          <FiPlus /> {isFormOpen ? 'Close Form' : 'Add Skill'}
        </Button>
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input id="name" label="Skill Name" value={formData.name} onChange={handleInputChange} required />
              
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Category</label>
                <select 
                  id="category" 
                  value={formData.category} 
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(18, 22, 41, 0.5)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-main)' }}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <Input id="percentage" type="number" label="Proficiency (%)" value={formData.percentage} onChange={handleInputChange} required min="0" max="100" />
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              {editingId ? 'Update Skill' : 'Save Skill'}
            </Button>
          </form>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {skills.map(skill => (
          <Card key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} hoverEffect={false}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{skill.name}</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '4px' }}>{skill.category}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{skill.percentage}%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm" onClick={() => handleEdit(skill)}>
                <FiEdit2 />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(skill.id)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
        {skills.length === 0 && !loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No skills found. Add one above.</p>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;
