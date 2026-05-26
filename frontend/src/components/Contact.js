import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { personalInfo } from '../data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client side checks
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      // Connect to our express backend api (running on port 5000)
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' }); // reset form
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback message for development
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Backend offline. But you can reach me directly via email!' 
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>

      <div className="grid-2 contact-grid">
        {/* Contact Info Card */}
        <div className="contact-info-panel">
          <h3 className="contact-subtitle">Let's build something <span className="text-gradient-cyan-purple">amazing together!</span></h3>
          <p className="contact-lead-text">
            I am currently open to new opportunities, or collaborations. If you have a question or just want to say hi, feel free to drop me a message!
          </p>

          <div className="contact-details-list">
            <div className="glass-card contact-detail-item">
              <Mail className="detail-icon" size={20} />
              <div className="detail-texts">
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
            </div>

            <div className="glass-card contact-detail-item">
              <MapPin className="detail-icon" size={20} />
              <div className="detail-texts">
                <h4>Location</h4>
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <div className="glass-card contact-detail-item">
              <Phone className="detail-icon" size={20} />
              <div className="detail-texts">
                <h4>Phone / Telegram</h4>
                <span>+94 77 600 5507</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card contact-form-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Perera"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="perera@example.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Discussion"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Thanuja, I'd like to discuss a project..."
                className="form-input"
                required
              />
            </div>

            {/* Submission Status Alerts */}
            {status.success && (
              <div className="status-alert success">
                <CheckCircle size={18} />
                <span>Thank you! Your message was sent successfully.</span>
              </div>
            )}

            {status.error && (
              <div className="status-alert error">
                <AlertCircle size={18} />
                <span>{status.error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-submit" 
              disabled={status.loading}
            >
              <span>{status.loading ? 'Sending...' : 'Send Message'}</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
        }

        .contact-grid {
          align-items: flex-start;
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
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1.2rem;
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

        .detail-texts h4 {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 0.1rem;
        }

        .detail-texts span, .detail-texts a {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-texts a:hover {
          color: var(--accent-cyan);
        }

        /* Contact Form */
        .contact-form-card {
          padding: 2.2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
        }

        .btn-submit {
          width: 100%;
          margin-top: 1rem;
        }

        .status-alert {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .status-alert.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: var(--accent-green);
        }

        .status-alert.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        @media (max-width: 768px) {
          .contact-form-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
