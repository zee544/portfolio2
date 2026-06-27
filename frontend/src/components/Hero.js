import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, FileText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { personalInfo } from '../data';

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = React.useMemo(() => [
    "Full Stack Developer",
    "MERN Stack Developer",
    "",
    "Creative Problem Solver"
  ], []);

  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const DELAY_BETWEEN = 2000;

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
      }, TYPING_SPEED);
    }

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="bg-glow-blob bg-glow-cyan" />
      <div className="bg-glow-blob bg-glow-purple" style={{ top: '60%', right: '10%' }} />

      <div className="grid-2 hero-grid">
        <div className="hero-content">
          <span className="hero-greeting">Hi, my name is</span>
          <h1 className="hero-name">{personalInfo.name}</h1>
          <h2 className="hero-title">
            I am a <span className="typing-text text-gradient-cyan-purple">{displayText}</span>
            <span className="typing-cursor">|</span>
          
          </h2>
          
          <p className="hero-description">{personalInfo.bio}</p>

          <div className="hero-actions">
            <button onClick={() => handleScrollTo('projects')} className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </button>
            
          </div>

          <div className="hero-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
              <GitHubIcon size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <LinkedInIcon size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-icon" title="Email">
              <Mail size={20} />
            </a>
            <a href={personalInfo.resumeUrl} className="social-icon" title="Download CV">
              <FileText size={20} />
            </a>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src={personalInfo.imageUrl || "/api/placeholder/600/600"} 
              alt={personalInfo.name}
              className="hero-profile-image"
            />
            <div className="image-fade-overlay"></div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 140px;
        }

        .hero-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          z-index: 1;
        }

        .hero-greeting {
          color: var(--accent-cyan);
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          display: block;
        }

        .hero-name {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          min-height: 80px;
        }

        .typing-text {
          font-weight: 700;
        }

        .typing-cursor {
          color: var(--accent-cyan);
          animation: blink 0.8s infinite;
          margin-left: 2px;
        }

        .hero-description {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 540px;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .hero-socials {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-color: var(--accent-cyan);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-bounce);
        }

        .social-icon:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          transform: translateY(-5px);
          box-shadow: var(--shadow-glow-cyan);
          background: rgba(6, 182, 212, 0.05);
        }

        /* Image Container Styles - Preserved Position */
        .hero-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .hero-image-wrapper {
          position: relative;
          width: 550px;
          height: 550px;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
          background: transparent;
        }

        .hero-image-wrapper:hover {
          transform: translateY(-5px);
        }

        .hero-profile-image {
          position: absolute;
          top: -80px;
          left: 50px;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
          opacity: 1;
          filter: brightness(1) contrast(1.2);
        }

        .hero-image-wrapper:hover .hero-profile-image {
          transform: scale(1.05);
          opacity: 1;
          filter: brightness(1) contrast(1.2);
        }

        .image-fade-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .code-keyword { color: #f43f5e; }
        .code-string { color: var(--accent-cyan); }
        .code-boolean { color: #a855f7; }

        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Desktop Large */
        @media (max-width: 1200px) {
          .hero-image-wrapper {
            width: 450px;
            height: 450px;
          }
          .hero-profile-image {
            top: -60px;
            left: 40px;
          }
        }

        /* Tablet */
        @media (max-width: 968px) {
          .hero-section {
            padding-top: 100px;
            min-height: auto;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-name {
            font-size: 3rem;
          }
          .hero-title {
            font-size: 1.5rem;
            min-height: 70px;
          }
          .hero-image-container {
            order: -1;
          }
          .hero-image-wrapper {
            width: 400px;
            height: 400px;
            margin: 0 auto;
          }
          .hero-profile-image {
            top: -60px;
            left: 35px;
          }
        }

        /* Mobile Large */
        @media (max-width: 576px) {
          .hero-section {
            padding-top: 80px;
          }
          .hero-name {
            font-size: 2.2rem;
          }
          .hero-title {
            font-size: 1.2rem;
            min-height: 60px;
          }
          .hero-description {
            font-size: 0.95rem;
          }
          .hero-actions {
            flex-direction: column;
            gap: 1rem;
          }
          .hero-actions button {
            width: 100%;
            justify-content: center;
          }
          .hero-socials {
            justify-content: center;
          }
          .hero-greeting {
            font-size: 0.9rem;
          }
          .hero-image-wrapper {
            width: 320px;
            height: 320px;
          }
          .hero-profile-image {
            top: -45px;
            left: 28px;
          }
        }

        /* Mobile Small */
        @media (max-width: 480px) {
          .hero-image-wrapper {
            width: 280px;
            height: 280px;
          }
          .hero-profile-image {
            top: -40px;
            left: 25px;
          }
          .hero-name {
            font-size: 1.8rem;
          }
          .hero-title {
            font-size: 1rem;
            min-height: 50px;
          }
        }

        /* Extra Small */
        @media (max-width: 380px) {
          .hero-image-wrapper {
            width: 250px;
            height: 250px;
          }
          .hero-profile-image {
            top: -35px;
            left: 22px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;