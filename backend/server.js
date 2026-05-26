const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins for development simplicity, but can be restricted later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount API routes
app.use('/api', apiRoutes);

// Simple root welcome route
app.get('/', (req, res) => {
  res.send('Thanuja Sewmini Portfolio Backend API is running...');
});

// Start the server after DB connection check
const startServer = async () => {
  // Connect to DB (or local JSON fallback)
  await db.connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running in production/development on http://localhost:${PORT}`);
  });
};

startServer();
