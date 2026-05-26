import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { personalInfo } from '../data';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-info-centered">
          <div className="contact-info-panel glass-card">
            <h3 className="contact-subtitle">Let's build something <span className="text-gradient-cyan-purple">amazing together!</span></h3>
            <p className="contact-lead-text">
              I am currently open to new opportunities, or collaborations. If you have a question or just want to say hi, feel free to drop me a message!
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <Mail className="detail-icon" size={20} />
                <div className="detail-texts">
                  <h4>Email</h4>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <MapPin className="detail-icon" size={20} />
                <div className="detail-texts">
                  <h4>Location</h4>
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              <div className="contact-detail-item">
                <Phone className="detail-icon" size={20} />
                <div className="detail-texts">
                  <h4>Phone / Telegram</h4>
                  <span>+94 77 600 5507</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
          padding: 4rem 2rem;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #fff, var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-info-centered {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .contact-info-panel {
          padding: 2.5rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .contact-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .contact-lead-text {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 400px;
        }

        .contact-detail-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }

        .detail-icon {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-texts {
          text-align: left;
        }

        .detail-texts h4 {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
          letter-spacing: 0.5px;
        }

        .detail-texts span, .detail-texts a {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-texts a:hover {
          color: var(--accent-cyan);
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 2rem 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          
          .contact-subtitle {
            font-size: 1.5rem;
          }
          
          .contact-info-panel {
            padding: 1.5rem;
          }
          
          .contact-detail-item {
            padding: 0.8rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .contact-subtitle {
            font-size: 1.3rem;
          }
          
          .contact-lead-text {
            font-size: 0.95rem;
          }
          
          .detail-icon {
            width: 36px;
            height: 36px;
          }
          
          .detail-texts h4 {
            font-size: 0.75rem;
          }
          
          .detail-texts span, .detail-texts a {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;