// filepath: backend/controllers/authController.js
const User = require('../models/User');
const { generateAccessToken } = require('../utils/jwt');
const { validationResult } = require('express-validator');

// Registration logic
const register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    console.log('Extracted data:', { firstName, lastName, email, passwordLength: password?.length });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Creating new user...');
    // Create user (password will be hashed by the User model pre-save hook)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    console.log('User created successfully:', user.email);
    // Generate JWT token
    const token = generateAccessToken(user);

    // Return user data (exclude password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login logic
const login = async (req, res) => {
  try {
    console.log('Login attempt with:', req.body);
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Email:', email, 'Password length:', password?.length);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user.email);
    // Verify password
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateAccessToken(user);

    // Return user data and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Profile logic
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { register, login, profile };