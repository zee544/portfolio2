import React, { useState } from 'react';
import { projects } from '../data';
import { ExternalLink, Search } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full Stack', 'Frontend'];

  // Filter projects by category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });



  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">My Projects</h2>

      {/* Filter and Search Bar */}
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

      {/* Projects Grid */}
      <div className="grid-3 projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-card project-card glow-cyan-hover">
            
            {/* Project Image Header */}
            <div className="project-image-container" >
              <img 
               src={project.image} 
  alt={project.title}
                
                className="project-image"
              />
              <div className="project-image-overlay">
                <span className="project-category-badge">{project.category}</span>
              </div>
            </div>

            {/* Project Content */}
            <div className="project-info">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
              
              {/* Tech Tags */}
              <div className="project-tech-tags">
                {project.tech.map((t, index) => (
                  <span key={index} className="badge project-tech-tag">{t}</span>
                ))}
              </div>

              {/* Project Links */}
              <div className="project-card-links">
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
                {project.liveLink !== '#' && (
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
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .project-link:hover {
          color: var(--accent-cyan);
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

        @media (max-width: 968px) {
          .projects-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
