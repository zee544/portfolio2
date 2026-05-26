const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;
const JSON_FILE_PATH = path.join(__dirname, '..', 'messages.json');

// Initialize JSON database if not exists
if (!fs.existsSync(JSON_FILE_PATH)) {
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify([], null, 2));
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('⚠️ MONGO_URI not provided. Backend will use local JSON file storage (messages.json).');
    isConnected = false;
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000 // 3 seconds timeout
    });
    console.log('✅ Connected to MongoDB database.');
    isConnected = true;
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('⚠️ Falling back to local JSON file storage (messages.json).');
    isConnected = false;
    return false;
  }
};

const getMessages = async () => {
  if (isConnected) {
    try {
      // Import dynamically to avoid mongoose errors if schema isn't fully registered
      const Message = mongoose.model('Message');
      return await Message.find().sort({ createdAt: -1 });
    } catch (err) {
      console.log('Error querying MongoDB, using local fallback:', err);
    }
  }

  // File fallback
  try {
    const rawData = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const messages = JSON.parse(rawData);
    // Sort by createdAt descending
    return messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Error reading local JSON file:', err);
    return [];
  }
};

const saveMessage = async (messageData) => {
  const data = {
    ...messageData,
    createdAt: new Date().toISOString()
  };

  if (isConnected) {
    try {
      const Message = mongoose.model('Message');
      const newMessage = new Message(data);
      await newMessage.save();
      return newMessage;
    } catch (err) {
      console.log('Error saving to MongoDB, saving to local fallback instead:', err);
    }
  }

  // File fallback
  try {
    const rawData = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const messages = JSON.parse(rawData);
    data.id = '_' + Math.random().toString(36).substr(2, 9);
    messages.push(data);
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(messages, null, 2));
    return data;
  } catch (err) {
    console.error('Error saving to local JSON file:', err);
    throw err;
  }
};

const checkStatus = () => {
  return isConnected ? 'MongoDB' : 'Local JSON File';
};

module.exports = {
  connectDB,
  getMessages,
  saveMessage,
  checkStatus
};
