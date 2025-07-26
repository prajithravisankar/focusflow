const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/database');
const { Redis } = require('@upstash/redis');
const { generateAccessToken } = require('./utils/jwt');
const rateLimit = require('./middleware/rateLimit');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// task routes
const taskRoutes = require('./routes/tasks');

// validation
const { registerValidation, validate, loginValidation, taskValidation } = require('./utils/validation');

// controllers
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

// authentication
const authMiddleware = require('./middleware/auth');

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

// app.post('/api/tasks', authMiddleware, taskValidation, validate, taskController.createTask);

// app.get('/api/tasks', authMiddleware, taskController.getUserTasks);

// app.put('/api/tasks/:id', authMiddleware, taskValidation, validate, taskController.updateTask);

// app.delete('/api/tasks/:id', authMiddleware, taskController.deleteTask);

app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});