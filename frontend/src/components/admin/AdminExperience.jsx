import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

const AdminExperience = () => {
  const [activeSubTab, setActiveSubTab] = useState('internships');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems();
  }, [activeSubTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/${activeSubTab}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEmptyForm = () => {
    if (activeSubTab === 'internships') {
      return { role: '', company: '', duration: '', description: '' };
    } else if (activeSubTab === 'certifications') {
      return { name: '', issuer: '', date: '', credentialUrl: '' };
    } else {
      return { title: '', description: '', date: '', icon: '' };
    }
  };

  const handleOpenForm = () => {
    setFormData(getEmptyForm());
    setEditingId(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/${activeSubTab}/${editingId}`, formData);
      } else {
        await api.post(`/${activeSubTab}`, formData);
      }
      setIsFormOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await api.delete(`/${activeSubTab}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const renderFormFields = () => {
    if (activeSubTab === 'internships') {
      return (
        <>
          <Input id="role" label="Role" value={formData.role || ''} onChange={handleInputChange} required />
          <Input id="company" label="Company" value={formData.company || ''} onChange={handleInputChange} required />
          <Input id="duration" label="Duration" value={formData.duration || ''} onChange={handleInputChange} required />
          <Input id="description" label="Description" value={formData.description || ''} onChange={handleInputChange} required type="textarea" />
        </>
      );
    } else if (activeSubTab === 'certifications') {
      return (
        <>
          <Input id="name" label="Certification Name" value={formData.name || ''} onChange={handleInputChange} required />
          <Input id="issuer" label="Issuer" value={formData.issuer || ''} onChange={handleInputChange} required />
          <Input id="date" label="Date" value={formData.date || ''} onChange={handleInputChange} required />
          <Input id="credentialUrl" label="Credential URL" value={formData.credentialUrl || ''} onChange={handleInputChange} />
        </>
      );
    } else {
      return (
        <>
          <Input id="title" label="Achievement Title" value={formData.title || ''} onChange={handleInputChange} required />
          <Input id="date" label="Date" value={formData.date || ''} onChange={handleInputChange} required />
          <Input id="icon" label="Icon (e.g., FiAward)" value={formData.icon || ''} onChange={handleInputChange} />
          <Input id="description" label="Description" value={formData.description || ''} onChange={handleInputChange} required type="textarea" />
        </>
      );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Manage Experience</h2>
        <Button variant="primary" onClick={handleOpenForm}>
          <FiPlus /> {isFormOpen ? 'Close Form' : 'Add Item'}
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        {['internships', 'certifications', 'achievements'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveSubTab(tab); setIsFormOpen(false); }}
            style={{
              background: 'none',
              border: 'none',
              color: activeSubTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeSubTab === tab ? '2px solid var(--primary)' : 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: activeSubTab === tab ? 600 : 400,
              fontSize: '1rem'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {renderFormFields()}
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              {editingId ? 'Update Item' : 'Save Item'}
            </Button>
          </form>
        </Card>
      )}

      {loading && items.length === 0 ? <Loader /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <Card key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} hoverEffect={false}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.role || item.name || item.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {item.company || item.issuer || item.date} {item.duration && `| ${item.duration}`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <FiEdit2 />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                  <FiTrash2 />
                </Button>
              </div>
            </Card>
          ))}
          {items.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No items found. Add one above.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
