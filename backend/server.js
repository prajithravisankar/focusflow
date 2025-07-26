const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/database');
const { Redis } = require('@upstash/redis');
const { registerValidation, validate, loginValidation } = require('./utils/validation');
const { generateAccessToken } = require('./utils/jwt');
const authMiddleware = require('./middleware/auth');
const authController = require('./controllers/authController');
const rateLimit = require('./middleware/rateLimit');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Connect to Database
connectDB();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5050;
const loginRateLimit = rateLimit('login', 5, 15 * 60);
const registerRateLimit = rateLimit('register', 3, 60 * 60);


// Route to generate a token (for testing)
app.post('/api/test-token', (req, res) => {
  const user = { _id: '12345', email: 'test@example.com' }; // Mock user data
  const token = generateAccessToken(user);
  res.status(200).json({ token });
});

// Protected route to test middleware
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error occurred!' });
});

app.post('/api/auth/register', registerRateLimit, registerValidation, validate, authController.register);

app.post('/api/auth/login', loginRateLimit, loginValidation, validate ,authController.login);

app.get('/api/auth/profile', authMiddleware, authController.profile);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});