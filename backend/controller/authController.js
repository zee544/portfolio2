const jwt = require('jsonwebtoken');

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide both username and password.' });
  }

  // Load admin credentials from env, or use defaults
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'thanuja@admin';
  const JWT_SECRET = process.env.JWT_SECRET || 'thanuja_portfolio_secret_key_123';

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  try {
    // Generate JWT token
    const token = jwt.sign(
      { role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' } // Token valid for 24 hours
    );

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Authentication error.' });
  }
};

// Middleware to verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'thanuja_portfolio_secret_key_123';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Session expired or invalid token.' });
  }
};
