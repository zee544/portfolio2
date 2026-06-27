import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data';

const Navbar = ({ showAdmin, setShowAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (showAdmin) return;
      
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAdmin]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
     { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setShowAdmin(false);
    
   
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          <span className="logo-text">{personalInfo.name.split(' ')[0]}</span>
          <span className="logo-dot">.</span>
        </a>

    
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <a
                href={`#${link.id}`}
                className={`nav-link ${!showAdmin && activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
         
        </ul>

    
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

     
      <div className={`mobile-menu-overlay ${isOpen ? 'show' : ''}`}>
        <ul className="mobile-menu-list">
          {navLinks.map((link) => (
            <li key={link.id} className="mobile-menu-item">
              <a
                href={`#${link.id}`}
                className={`mobile-menu-link ${!showAdmin && activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 2rem;
          transition: var(--transition-smooth);
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .navbar-scrolled {
          padding: 1rem 2rem;
          background: var(--bg-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-glass);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -1px;
          display: flex;
          align-items: center;
        }

        .logo-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-dot {
          color: var(--accent-pink);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          padding: 0.2rem 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: var(--transition-smooth);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .btn-admin-nav {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .btn-admin-nav:hover, .btn-admin-nav.active {
          border-color: var(--accent-cyan);
          color: var(--text-primary);
          background: rgba(6, 182, 212, 0.05);
          box-shadow: var(--shadow-glow-cyan);
        }

        .mobile-toggle {
          display: none;
          cursor: pointer;
          color: var(--text-primary);
        }

        /* Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-glass);
          padding: 6rem 2rem 2rem;
          z-index: 999;
          transition: var(--transition-bounce);
          box-shadow: var(--shadow-glass);
        }

        .mobile-menu-overlay.show {
          right: 0;
        }

        .mobile-menu-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-menu-link {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: block;
          padding: 0.5rem 0;
        }

        .mobile-menu-link:hover, .mobile-menu-link.active {
          color: var(--text-primary);
          padding-left: 8px;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
