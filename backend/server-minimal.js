const express = require('express');
const cors = require('cors');

const app = express();

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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Minimal server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
