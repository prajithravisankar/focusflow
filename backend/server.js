const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/database');
// const { Redis } = require('@upstash/redis'); // Comment out Redis temporarily
const { generateAccessToken } = require('./utils/jwt');
// const rateLimit = require('./middleware/rateLimit'); // Comment out rate limit temporarily
// const helmet = require('helmet'); // Already commented out
const cors = require('cors');
// const morgan = require('morgan'); // Comment out morgan temporarily

// routes
const taskRoutes = require('./routes/tasks');
const sessionRoutes = require('./routes/sessions');

// validation
const { registerValidation, validate, loginValidation, taskValidation } = require('./utils/validation');

// controllers
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

// authentication
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware to ensure database connection for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Connect to Database (for local development)
if (process.env.NODE_ENV !== 'production') {
  connectDB().catch(console.error);
}

// Simple CORS configuration
const corsOptions = {
  origin: true, // Allow all origins for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
// app.use(morgan('dev')); // Commented out

// Handle preflight requests
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5050;
// const loginRateLimit = rateLimit('login', 50, 15 * 60); // Commented out
// const registerRateLimit = rateLimit('register', 30, 60 * 60); // Commented out


// Route to generate a token (for testing) - Commented out for debugging
// app.post('/api/test-token', (req, res) => {
//   const user = { _id: '12345', email: 'test@example.com' }; // Mock user data
//   const token = generateAccessToken(user);
//   res.status(200).json({ token });
// });

// Protected route to test middleware
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error occurred!' });
});

app.post('/api/auth/register', registerValidation, validate, authController.register);

app.post('/api/auth/login', loginValidation, validate, authController.login);

app.get('/api/auth/profile', authMiddleware, authController.profile);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Debug route to test token validation
app.get('/api/debug/token', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  
  res.json({
    hasAuthHeader: !!authHeader,
    headerValue: authHeader ? 'Bearer [token]' : null,
    tokenLength: token ? token.length : 0,
    jwtSecret: process.env.JWT_SECRET ? 'SET' : 'MISSING',
    allHeaders: Object.keys(req.headers),
    corsHeaders: {
      origin: req.headers.origin,
      method: req.method
    }
  });
});

// Debug route that requires auth
app.get('/api/debug/auth-test', authMiddleware, (req, res) => {
  res.json({
    message: 'Authentication successful!',
    user: req.user
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'FocusFlow Backend API', status: 'OK' });
});

// app.post('/api/tasks', authMiddleware, taskValidation, validate, taskController.createTask);

// app.get('/api/tasks', authMiddleware, taskController.getUserTasks);

// app.put('/api/tasks/:id', authMiddleware, taskValidation, validate, taskController.updateTask);

// app.delete('/api/tasks/:id', authMiddleware, taskController.deleteTask);

app.use('/api/tasks', taskRoutes);
app.use('/api/sessions', sessionRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
