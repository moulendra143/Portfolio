import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiLayout, FiCode, FiAward, FiMessageSquare, FiFileText, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AdminProjects from '../components/admin/AdminProjects';
import AdminSkills from '../components/admin/AdminSkills';
import AdminExperience from '../components/admin/AdminExperience';
import AdminMessages from '../components/admin/AdminMessages';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminResumes from '../components/admin/AdminResumes';
import AdminSettings from '../components/admin/AdminSettings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const { currentUser, logout, loading } = useAuth();

  useEffect(() => {
    // Check auth
    if (!loading && !currentUser) {
      navigate('/admin');
    }
  }, [currentUser, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'projects', label: 'Projects', icon: <FiLayout /> },
    { id: 'skills', label: 'Skills', icon: <FiCode /> },
    { id: 'experience', label: 'Experience', icon: <FiAward /> },
    { id: 'blogs', label: 'Blogs', icon: <FiFileText /> },
    { id: 'resumes', label: 'Resumes', icon: <FiFileText /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageSquare /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'projects':
        return <AdminProjects />;
      case 'skills':
        return <AdminSkills />;
      case 'experience':
        return <AdminExperience />;
      case 'blogs':
        return <AdminBlogs />;
      case 'resumes':
        return <AdminResumes />;
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminProjects />;
    }
  };

  if (loading) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'var(--bg-darker)', borderRight: '1px solid var(--border-light)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h2 className="gradient-text" style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Admin Panel</h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                background: activeTab === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            background: 'transparent',
            color: '#ef4444',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            marginTop: 'auto'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
