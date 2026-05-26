import React, { useState, useEffect, useCallback } from 'react';
import { Lock, LogOut, Mail, User, Calendar, RefreshCw, Database } from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define handleLogout FIRST before it's used
  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setMessages([]);
    setUsername('');
    setPassword('');
  }, []);

  // Now define fetchMessages (can use handleLogout)
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setMessages(data.data);
      } else {
        setError(data.error || 'Failed to fetch messages.');
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      setError('Failed to load messages from backend API.');
    } finally {
      setLoading(false);
    }
  }, [token, handleLogout]);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setDbStatus(data.database || 'Local JSON File');
    } catch (err) {
      setDbStatus('Offline');
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchMessages();
      fetchStatus();
    }
  }, [token, fetchMessages, fetchStatus]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Could not connect to backend authorization API.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <section id="admin-login" className="admin-section">
        <div className="glass-card login-card">
          <div className="login-header">
            <Lock className="login-lock-icon" size={32} />
            <h2>Admin Portal</h2>
            <p>Log in to view portfolio contact inquiries</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="form-input text-input-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input text-input-icon"
                  required
                />
              </div>
            </div>

            {error && <div className="admin-error-box">{error}</div>}

            <button type="submit" className="btn btn-primary btn-login" disabled={loading}>
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>
        </div>

        <style>{`
          .admin-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 120px;
          }
          .login-card {
            width: 100%;
            max-width: 420px;
            padding: 2.5rem;
          }
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .login-lock-icon {
            color: var(--accent-cyan);
            margin-bottom: 0.8rem;
            filter: drop-shadow(0 0 8px rgba(6,182,212,0.3));
          }
          .login-header h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--text-primary);
          }
          .login-header p {
            font-size: 0.95rem;
            color: var(--text-secondary);
          }
          .input-with-icon {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-icon {
            position: absolute;
            left: 12px;
            color: var(--text-muted);
          }
          .text-input-icon {
            padding-left: 2.5rem !important;
            width: 100%;
          }
          .btn-login {
            width: 100%;
            margin-top: 1rem;
          }
          .admin-error-box {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #f87171;
            padding: 0.8rem;
            border-radius: 8px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            text-align: center;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section id="admin-dashboard" className="admin-section">
      <div className="dashboard-container">
        
        {/* Dashboard Header Banner */}
        <div className="dashboard-header glass-card">
          <div className="header-meta">
            <h1>Admin Dashboard</h1>
            <div className="db-badge">
              <Database size={14} />
              <span>Storage: {dbStatus}</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button onClick={fetchMessages} className="btn-refresh" title="Refresh messages">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button onClick={handleLogout} className="btn btn-secondary btn-logout">
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Error Alert */}
        {error && <div className="admin-error-box">{error}</div>}

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h2 className="inbox-title">Received Inquiries ({messages.length})</h2>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching messages...</p>
            </div>
          )}

          {!loading && messages.length === 0 && (
            <div className="glass-card empty-inbox-card">
              <Mail size={40} className="empty-icon" />
              <h3>Your Inbox is Empty</h3>
              <p>Any messages submitted through the contact form will appear here.</p>
            </div>
          )}

          {!loading && messages.length > 0 && (
            <div className="messages-grid">
              {messages.map((msg, index) => (
                <div key={msg.id || index} className="glass-card message-card">
                  <div className="msg-header">
                    <div className="msg-sender">
                      <h3 className="sender-name">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="sender-email">{msg.email}</a>
                    </div>
                    <div className="msg-date">
                      <Calendar size={14} />
                      <span>{new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                  <div className="msg-subject">
                    <strong>Subject:</strong> {msg.subject}
                  </div>
                  <p className="msg-text">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-section {
          padding-top: 120px;
          min-height: 80vh;
        }
        .dashboard-container {
          width: 100%;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .header-meta h1 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .db-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          background: rgba(255,255,255,0.05);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          color: var(--accent-cyan);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-refresh {
          background: transparent;
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }
        .btn-refresh:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
          background: rgba(255,255,255,0.02);
        }
        .btn-logout {
          padding: 0.5rem 1.2rem;
          font-size: 0.9rem;
        }
        .inbox-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .loading-container {
          text-align: center;
          padding: 4rem;
          color: var(--text-secondary);
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.05);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          margin: 0 auto 1rem;
          animation: spin 1s infinite linear;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .empty-inbox-card {
          padding: 4rem;
          text-align: center;
        }
        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .empty-inbox-card h3 {
          font-size: 1.3rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .empty-inbox-card p {
          color: var(--text-secondary);
        }
        .messages-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .message-card {
          padding: 1.8rem;
          transition: var(--transition-smooth);
        }
        .message-card:hover {
          border-color: var(--border-glass-hover);
        }
        .msg-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sender-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .sender-email {
          font-size: 0.95rem;
          color: var(--accent-cyan);
        }
        .sender-email:hover {
          text-decoration: underline;
        }
        .msg-date {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .msg-subject {
          margin-bottom: 0.8rem;
          color: var(--text-primary);
          font-size: 1.05rem;
        }
        .msg-text {
          color: var(--text-secondary);
          line-height: 1.6;
          white-space: pre-wrap;
          font-size: 0.98rem;
        }
      `}</style>
    </section>
  );
};

export default Admin;