import React from 'react';
import {  MapPin, Award, Code, Globe, User } from 'lucide-react';
import { personalInfo } from '../data';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>

      <div className="grid-2 about-grid">
        <div className="about-text-content">
          
          <p className="about-paragraph">
            Hi! I'm Thanuja, an undergraduate student passionate about creating things that live on the internet — from websites and web applications to creative digital solutions.

I enjoy building responsive and user-friendly applications while continuously improving my skills in both frontend and backend development. </p><p className="about-paragraph">My main focus is on the MERN stack, and I’m always eager to explore new technologies and tools.

As an aspiring software engineer, I have worked on projects involving full-stack web development, REST APIs, database management, and modern UI design. I’m particularly interested in developing scalable applications and learning industry-level technologies such as microservices, and DevOps practices.
          </p>
          

          <div className="about-info-grid">
            <div className="info-item">
              <User className="info-icon" size={18} />
              <span><strong>Name:</strong> {personalInfo.name}</span>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" size={18} />
              <span><strong>Location:</strong> {personalInfo.location}</span>
            </div>
            
            <div className="info-item">
              <Globe className="info-icon" size={18} />
              <span><strong>Languages:</strong> English, Sinhala</span>
            </div>
          </div>
        </div>

    
        <div className="about-highlights-grid">
          <div className="glass-card highlight-card glow-cyan-hover">
            <Award className="highlight-icon cyan" size={32} />
            <h4 className="highlight-title">Education</h4>
            <p className="highlight-text">BSc (Hons) in Information Technology Specializing in Software Engineering (Undergraduate)</p>
     
          </div>

          <div className="glass-card highlight-card glow-purple-hover">
            <Code className="highlight-icon purple" size={32} />
            <h4 className="highlight-title">Projects</h4>
           
            <span className="highlight-badge">8+ Applications</span>
          </div>

          
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
        }

        .about-grid {
          align-items: flex-start;
        }

        .about-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .about-paragraph {
          color: var(--text-secondary);
          margin-bottom: 1.2rem;
          font-size: 1.05rem;
        }

        .about-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .info-icon {
          color: var(--accent-cyan);
        }

        .about-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        /* Span the first card across both columns */
        .about-highlights-grid > *:first-child {
          grid-column: span 2;
        }

        .highlight-card {
          padding: 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .highlight-icon {
          margin-bottom: 1rem;
        }

        .highlight-icon.cyan {
          color: var(--accent-cyan);
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4));
        }

        .highlight-icon.purple {
          color: var(--accent-purple);
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
        }

        .highlight-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .highlight-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .highlight-badge {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .highlight-card:nth-child(2) .highlight-badge {
          color: var(--accent-purple);
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.2);
        }

        @media (max-width: 968px) {
          .about-highlights-grid {
            margin-top: 1rem;
          }
        }

        @media (max-width: 576px) {
          .about-info-grid {
            grid-template-columns: 1fr;
          }
          .about-highlights-grid {
            grid-template-columns: 1fr;
          }
          .about-highlights-grid > *:first-child {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
