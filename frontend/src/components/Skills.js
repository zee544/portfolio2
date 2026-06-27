import React from 'react';
import { skillCategories } from '../data';
import { Cpu, Server, Database, Settings } from 'lucide-react';

const Skills = () => {
  
  const getCategoryIcon = (title) => {
    switch (title) {
      case 'Frontend Development':
        return <Cpu size={24} className="category-icon cyan" />;
      case 'Backend Development':
        return <Server size={24} className="category-icon purple" />;
      case 'Databases & Storage':
        return <Database size={24} className="category-icon green" />;
      default:
        return <Settings size={24} className="category-icon pink" />;
    }
  };

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Technical Skills</h2>

      <div className="grid-2 skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass-card skill-category-card">
            <div className="category-header">
              {getCategoryIcon(category.title)}
              <h3 className="category-title">{category.title}</h3>
            </div>
            
            <div className="skills-list">
              {category.skills.map((skill, sIndex) => (
                <div key={sIndex} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                  
                  </div>
                 
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-section {
          position: relative;
        }

        .skills-grid {
          gap: 2rem;
        }

        .skill-category-card {
          padding: 2.2rem;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.8rem;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 0.8rem;
        }

        .category-icon {
          filter: drop-shadow(0 0 5px rgba(255,255,255,0.1));
        }

        .category-icon.cyan { color: var(--accent-cyan); }
        .category-icon.purple { color: var(--accent-purple); }
        .category-icon.green { color: var(--accent-green); }
        .category-icon.pink { color: var(--accent-pink); }

        .category-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .skill-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .skill-name {
          color: var(--text-primary);
        }

        .progress-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 1s ease-in-out;
        }

        /* Color progress fills uniquely per category index */
        .fill-0 {
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }

        .fill-1 {
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink));
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
        }

        .fill-2 {
          background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .fill-3 {
          background: linear-gradient(90deg, var(--accent-pink), var(--accent-cyan));
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
        }

        @media (max-width: 768px) {
          .skill-category-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
