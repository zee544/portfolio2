const db = require('../config/db');

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
exports.submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please enter all required fields.' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const newMessage = await db.saveMessage({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage
    });
  } catch (error) {
    console.error('Error in submitMessage:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact/messages
// @access  Private (Admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ error: 'Server error while fetching messages.' });
  }
};
