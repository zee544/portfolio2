const express = require('express');
const router = express.Router();

const contactController = require('../controller/contactController');
const authController = require('../controller/authController');

// Auth routes
router.post('/auth/login', authController.login);

// Contact routes
router.post('/contact', contactController.submitMessage);
router.get('/contact/messages', authController.protect, contactController.getMessages);

// Health check route
router.get('/status', (req, res) => {
  const db = require('../config/db');
  res.json({
    status: 'online',
    database: db.checkStatus(),
    timestamp: new Date()
  });
});

module.exports = router;
