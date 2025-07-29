const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import auth components
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');
const { registerValidation, validate, loginValidation } = require('./utils/validation');

const app = express();

// Database connection middleware for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Basic CORS
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'FocusFlow Backend API - Minimal Version', status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running - minimal version' });
});

// Debug endpoint
app.get('/api/debug/token', (req, res) => {
  const authHeader = req.headers.authorization;
  res.json({
    hasAuthHeader: !!authHeader,
    headerValue: authHeader ? 'Bearer [token]' : null,
    environment: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI ? 'SET' : 'MISSING',
    jwtSecret: process.env.JWT_SECRET ? 'SET' : 'MISSING'
  });
});

// Authentication routes
app.post('/api/auth/register', registerValidation, validate, authController.register);
app.post('/api/auth/login', loginValidation, validate, authController.login);

// Protected route test
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Auth test successful', 
    user: { 
      id: req.user.id, 
      email: req.user.email 
    } 
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Minimal server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
