import React from 'react';
import {  Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { personalInfo } from '../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and Tagline */}
        <div className="footer-about">
          <a href="#home" className="footer-logo" onClick={(e) => handleScrollTo(e, 'home')}>
            <span className="logo-text">{personalInfo.name.split(' ')[0]}</span>
            <span className="logo-dot">.</span>
          </a>
          <p className="footer-tagline">Building modern full-stack web applications with scalable architecture and premium design.</p>
        </div>

        {/* Quick Sitemap Links */}
        <div className="footer-links-group">
          <h3>Sitemap</h3>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a></li>
            <li><a href="#skills" onClick={(e) => handleScrollTo(e, 'skills')}>Skills</a></li>
            <li><a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')}>Projects</a></li>
            <li><a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')}>Experience</a></li>
            <li><a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a></li>
          </ul>
        </div>

        {/* Social connections */}
        <div className="footer-social-group">
          <h3>Socials</h3>
          <div className="footer-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="GitHub">
              <GitHubIcon size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="footer-social-icon" title="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright area */}
      <div className="footer-copyright-bar">
        <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
        
      </div>

      <style>{`
        .footer {
          background: rgba(3, 7, 18, 0.8);
          border-top: 1px solid var(--border-glass);
          padding: 4rem 2rem 2rem;
          margin-top: 4rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border-glass);
        }

        .footer-logo {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .footer-tagline {
          color: var(--text-secondary);
          max-width: 320px;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .footer-links-group h3, .footer-social-group h3 {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1.2rem;
          letter-spacing: 1px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .footer-links a:hover {
          color: var(--accent-cyan);
          padding-left: 4px;
        }

        .footer-socials {
          display: flex;
          gap: 1rem;
        }

        .footer-social-icon {
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-bounce);
        }

        .footer-social-icon:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          transform: scale(1.1);
          box-shadow: var(--shadow-glow-cyan);
        }

        .footer-copyright-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.9rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-made-with {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .heart-icon {
          color: var(--accent-pink);
          animation: beat 1s infinite alternate;
        }

        @keyframes beat {
          to { transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-copyright-bar {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
