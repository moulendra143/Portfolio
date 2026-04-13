import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiLink, FiCheckCircle } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', fileData: '', active: false
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resumes');
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fileData: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-deactivate others if this one is set to active
    if (formData.active) {
       for (const r of resumes) {
           if (r.active && r.id !== editingId) {
               await api.put(`/resumes/${r.id}`, { ...r, active: false });
           }
       }
    }

    try {
      if (editingId) {
        await api.put(`/resumes/${editingId}`, formData);
      } else {
        await api.post('/resumes', formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ title: '', fileData: '', active: false });
      fetchResumes();
    } catch (err) {
      console.error(err);
      alert('Failed to save resume. Please check your inputs and try again.');
      setLoading(false);
    }
  };

  const handleEdit = (resume) => {
    setFormData(resume);
    setEditingId(resume.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume link?')) {
      setLoading(true);
      try {
        await api.delete(`/resumes/${id}`);
        fetchResumes();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const handleSetActive = async (resumeToActivate) => {
      setLoading(true);
      try {
        // Deactivate all others
        for (const r of resumes) {
            if (r.active && r.id !== resumeToActivate.id) {
                await api.put(`/resumes/${r.id}`, { ...r, active: false });
            }
        }
        // Activate target
        await api.put(`/resumes/${resumeToActivate.id}`, { ...resumeToActivate, active: true });
        fetchResumes();
      } catch(err) {
          console.error(err);
          setLoading(false);
      }
  }

  if (loading && resumes.length === 0) return <Loader />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Manage Resumes</h2>
        <Button variant="primary" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setFormData({ title: '', fileData: '', active: false }); }}>
          <FiPlus /> {isFormOpen ? 'Close Form' : 'Add Resume PDF'}
        </Button>
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <Input id="title" label="Title (e.g. 2024 Resume)" value={formData.title} onChange={handleInputChange} required />
              
              <div>
                <Input id="fileUpload" label="Resume PDF" type="file" accept="application/pdf" onChange={handleFileUpload} required={!editingId && !formData.fileData} />
                {formData.fileData && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                        Current PDF loaded ({Math.round(formData.fileData.length / 1024)} KB)
                    </div>
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                    type="checkbox" 
                    id="active" 
                    checked={formData.active} 
                    onChange={handleInputChange} 
                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                />
                <label htmlFor="active" style={{ cursor: 'pointer', color: 'var(--text-main)' }}>Set as Active Resume (appears on public site)</label>
              </div>
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1.5rem' }}>
              {editingId ? 'Update Resume' : 'Save Resume'}
            </Button>
          </form>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {resumes.map(resume => (
          <Card key={resume.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: resume.active ? '1px solid var(--primary)' : 'none' }} hoverEffect={false}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0 }}>{resume.title}</h3>
                  {resume.active && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FiCheckCircle /> Active</span>}
              </div>
              {resume.fileData && (
                <a href={resume.fileData} download={`${resume.title}.pdf`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'none' }}>
                    <FiLink /> Download PDF
                </a>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!resume.active && (
                  <Button variant="outline" size="sm" onClick={() => handleSetActive(resume)} style={{ borderColor: '#10b981', color: '#10b981' }}>
                      Set Active
                  </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => handleEdit(resume)}>
                <FiEdit2 />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(resume.id)} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                <FiTrash2 />
              </Button>
            </div>
          </Card>
        ))}
        {resumes.length === 0 && !loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No resumes linked. Add one above.</p>
        )}
      </div>
    </div>
  );
};

export default AdminResumes;
