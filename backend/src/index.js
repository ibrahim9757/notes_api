// src/index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Middleware to parse JSON



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:3000', 'http://localhost:5173'], // Next.js default port 3000, Vite default port 5173
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Notes API is running!',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// 404 handler (must be after all routes)
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});