import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, FileText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { personalInfo } from '../data';

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Microservices & DevOps Enthusiast",
    "Creative Problem Solver"
  ];

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
  }, [displayText, isDeleting, titleIndex]);

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
            <button onClick={() => handleScrollTo('contact')} className="btn btn-secondary">
              <span>Contact Me</span>
              <Mail size={16} />
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

        {/* Coder Terminal Simulation */}
        <div className="hero-terminal glass-card">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-tab">developer.json</div>
          </div>
          <div className="terminal-body">
            <pre>
              <code>
                <span className="code-keyword">const</span> developer = &#123;<br />
                &nbsp;&nbsp;name: <span className="code-string">"{personalInfo.name}"</span>,<br />
                &nbsp;&nbsp;role: <span className="code-string">"Full Stack Software Engineer"</span>,<br />
                &nbsp;&nbsp;location: <span className="code-string">"{personalInfo.location}"</span>,<br />
                &nbsp;&nbsp;techStack: [<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"React / Redux"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"Node.js / Express"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"MongoDB / PostgreSQL"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"Docker / Kubernetes"</span><br />
                &nbsp;&nbsp;],<br />
                &nbsp;&nbsp;passionateAbout: <span className="code-string">"Scale, clean code & UI aesthetics"</span>,<br />
                &nbsp;&nbsp;currentlyLearning: <span className="code-string">"Cloud Native Architectures"</span>,<br />
                &nbsp;&nbsp;hireable: <span className="code-boolean">true</span><br />
                &#125;;
              </code>
            </pre>
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
          height: 40px; /* Prevent layout shifting */
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

        /* Terminal Window */
        .hero-terminal {
          position: relative;
          width: 100%;
          max-width: 500px;
          justify-self: end;
          overflow: hidden;
          font-family: 'Courier New', Courier, monospace;
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .terminal-header {
          background: rgba(255, 255, 255, 0.03);
          padding: 0.8rem 1rem;
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          position: relative;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27c93f; }

        .terminal-tab {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .terminal-body {
          padding: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #e2e8f0;
          overflow-x: auto;
        }

        .code-keyword { color: #f43f5e; }
        .code-string { color: var(--accent-cyan); }
        .code-boolean { color: #a855f7; }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (max-width: 968px) {
          .hero-section {
            padding-top: 100px;
            min-height: auto;
          }
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-terminal {
            justify-self: center;
            margin-top: 2rem;
          }
          .hero-name {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
