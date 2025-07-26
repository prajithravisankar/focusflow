const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { Redis } = require('@upstash/redis');
const { registerValidation, validate, loginValidation } = require('./utils/validation');
const { generateAccessToken } = require('./utils/jwt');
const authMiddleware = require('./middleware/auth');
const authController = require('./controllers/authController');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5050;

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

app.post('/api/auth/register', registerValidation, validate, authController.register);

app.post('/api/auth/login', loginValidation, validate ,authController.login);

app.get('/api/auth/profile', authMiddleware, authController.profile);

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

redis.set('test', 'upstash redis connected').then(() => {
    redis.get('test').then((value) => {
        console.log(value);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});