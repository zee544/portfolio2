import React, { useState } from 'react';
import { projects } from '../data';
import { ExternalLink, Search, X, Calendar, Tag, Code } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full Stack', 'Mobile App Design'];

 
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

 
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">My Projects</h2>

      <div className="projects-controls">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box glass-card">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="grid-3 projects-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="glass-card project-card glow-cyan-hover"
            onClick={() => handleProjectClick(project)}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-image-container">
              <img 
                src={project.image} 
                alt={project.title}
                className="project-image"
              />
              <div className="project-image-overlay">
                <span className="project-category-badge">{project.category}</span>
              </div>
            </div>

            <div className="project-info">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
              
              <div className="project-tech-tags">
                {project.tech.slice(0, 4).map((t, index) => (
                  <span key={index} className="badge project-tech-tag">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="badge project-tech-tag">+{project.tech.length - 4}</span>
                )}
              </div>

              <div className="project-card-links" onClick={(e) => e.stopPropagation()}>
                {project.githubLink && project.githubLink !== '#' && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                    title="Source Code"
                  >
                    <GitHubIcon size={18} />
                    <span>Code</span>
                  </a>
                )}
                {project.linkedinLink && project.linkedinLink !== '#' && (
                  <a 
                    href={project.linkedinLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                    title="View on LinkedIn"
                  >
                    <LinkedInIcon size={18} />
                  </a>
                )}
                {project.liveLink && project.liveLink !== '#' && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link live"
                    title="Live Demo"
                  >
                    <ExternalLink size={18} />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects-found">
          <p>No projects found matching your criteria. Try searching for other technologies!</p>
        </div>
      )}


      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-image-container">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="modal-image"
              />
              <span className="modal-category-badge">{selectedProject.category}</span>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              <div className="modal-meta">
                {selectedProject.date && (
                  <span className="modal-meta-item">
                    <Calendar size={16} />
                    {selectedProject.date}
                  </span>
                )}
                {selectedProject.role && (
                  <span className="modal-meta-item">
                    <Tag size={16} />
                    {selectedProject.role}
                  </span>
                )}
              </div>

              <p className="modal-description">{selectedProject.description}</p>

              {selectedProject.details && (
                <div className="modal-details">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedProject.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-tech-section">
                <h4>Technologies Used</h4>
                <div className="modal-tech-tags">
                  {selectedProject.tech.map((t, index) => (
                    <span key={index} className="badge modal-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-links" onClick={(e) => e.stopPropagation()}>
                {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                  <a 
                    href={selectedProject.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="modal-link"
                  >
                    <GitHubIcon size={20} />
                    
                  </a>
                )}
                {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                  <a 
                    href={selectedProject.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="modal-link"
                  >
                    <ExternalLink size={20} />
                    
                  </a>
                )}
                {selectedProject.linkedin && selectedProject.linkedin !== '#' && (
                  <a 
                    href={selectedProject.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="modal-link"
                  >
                    <LinkedInIcon size={20} />
                    
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .projects-section {
          position: relative;
        }

        .projects-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 0.3rem;
          border-radius: 50px;
          flex-wrap: wrap;
        }

        .filter-tab {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-smooth);
        }

        .filter-tab:hover {
          color: var(--text-primary);
        }

        .filter-tab.active {
          background: var(--gradient-primary);
          color: #fff;
          box-shadow: var(--shadow-glow-cyan);
        }

        .search-box {
          display: flex;
          align-items: center;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          width: 320px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 0.8rem;
        }

        .search-input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          width: 100%;
          outline: none;
          font-size: 0.95rem;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .projects-grid {
          margin-top: 1rem;
        }

        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: var(--transition-smooth);
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-glow-cyan);
        }

        .project-image-container {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-bounce);
        }

        .project-card:hover .project-image {
          transform: scale(1.08);
        }

        .project-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(3, 7, 18, 0.1) 0%, rgba(3, 7, 18, 0.6) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .project-category-badge {
          background: rgba(3, 7, 18, 0.8);
          border: 1px solid var(--border-glass);
          color: var(--accent-cyan);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .project-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          color: var(--text-primary);
        }

        .project-card-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.2rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .project-tech-tag {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
        }

        .project-card-links {
          display: flex;
          gap: 1rem;
          border-top: 1px solid var(--border-glass);
          padding-top: 1rem;
          flex-wrap: wrap;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .project-link:hover {
          color: var(--accent-cyan);
          transform: translateY(-2px);
        }

        .project-link.live:hover {
          color: var(--accent-purple);
        }

        .no-projects-found {
          grid-column: span 3;
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border-glass);
          border-radius: 24px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: var(--accent-cyan);
          border-radius: 3px;
        }

        .modal-close {
          position: sticky;
          top: 1rem;
          right: 1rem;
          float: right;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border-glass);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-smooth);
          z-index: 10;
          margin: 1rem;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .modal-image-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 24px 24px 0 0;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-category-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(3, 7, 18, 0.8);
          border: 1px solid var(--border-glass);
          color: var(--accent-cyan);
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .modal-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .modal-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .modal-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .modal-details {
          margin-bottom: 2rem;
        }

        .modal-details h4 {
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .modal-details ul {
          list-style: none;
          padding: 0;
        }

        .modal-details li {
          color: var(--text-secondary);
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          border-bottom: 1px solid var(--border-glass);
        }

        .modal-details li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent-cyan);
        }

        .modal-tech-section {
          margin-bottom: 2rem;
        }

        .modal-tech-section h4 {
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .modal-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .modal-tech-tag {
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.4rem 0.8rem;
        }

        .modal-links {
          display: flex;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-glass);
          flex-wrap: wrap;
        }

        .modal-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          font-weight: 600;
          transition: var(--transition-smooth);
          text-decoration: none;
        }

        .modal-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .modal-link.live {
          background: var(--gradient-primary);
          border-color: transparent;
        }

        .modal-link.live:hover {
          box-shadow: var(--shadow-glow-cyan);
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 1rem;
            max-height: 95vh;
          }

          .modal-image-container {
            height: 200px;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-description {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 968px) {
          .projects-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            width: 100%;
          }
          .filter-tabs {
            justify-content: center;
          }
          .no-projects-found {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;