import React from 'react';
import { experienceTimeline } from '../data';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">My Journey</h2>

      <div className="timeline-container">
        {experienceTimeline.map((item, index) => {
          const isExp = item.type === 'experience';
          return (
            <div key={item.id} className="timeline-item">
              
              {/* Chronological Indicator Line & Node */}
              <div className="timeline-line-node">
                <div className={`timeline-node ${isExp ? 'exp' : 'edu'}`}>
                  {isExp ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                </div>
              </div>

              {/* Timeline Info Card */}
              <div className="glass-card timeline-card glow-cyan-hover">
                <div className="timeline-card-header">
                  <span className={`timeline-type-badge ${isExp ? 'exp' : 'edu'}`}>
                    {isExp ? 'Work Experience' : 'Education'}
                  </span>
                  <div className="timeline-duration">
                    <Calendar size={14} />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="timeline-card-title">{item.title}</h3>
                <h4 className="timeline-card-org">{item.organization}</h4>
                <p className="timeline-card-desc">{item.description}</p>
              </div>

            </div>
          );
        })}
      </div>

      <style>{`
        .experience-section {
          position: relative;
        }

        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 2.5rem; /* Space for the line */
        }

        /* Central Timeline Line */
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 5px;
          bottom: 5px;
          width: 2px;
          background: linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-purple) 50%, var(--accent-pink) 100%);
          opacity: 0.3;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        /* Line and Node positioning */
        .timeline-line-node {
          position: absolute;
          left: -2.5rem;
          top: 15px;
          z-index: 2;
        }

        .timeline-node {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
          position: absolute;
          left: -1px; /* Center with timeline line */
        }

        .timeline-node.exp {
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-cyan));
          border: 2px solid var(--bg-primary);
          box-shadow: 0 0 10px var(--accent-cyan);
        }

        .timeline-node.edu {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
          border: 2px solid var(--bg-primary);
          box-shadow: 0 0 10px var(--accent-purple);
        }

        /* Timeline Info Card */
        .timeline-card {
          padding: 1.8rem;
          margin-left: 1.2rem;
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .timeline-type-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .timeline-type-badge.exp {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .timeline-type-badge.edu {
          color: var(--accent-purple);
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .timeline-duration {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .timeline-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        .timeline-card-org {
          font-size: 1rem;
          font-weight: 500;
          color: var(--accent-cyan);
          margin-bottom: 0.8rem;
        }

        .timeline-card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        @media (max-width: 576px) {
          .timeline-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .timeline-card {
            padding: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
