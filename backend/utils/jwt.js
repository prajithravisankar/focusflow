// filepath: backend/utils/jwt.js
const jwt = require('jsonwebtoken');

// Generate Access Token (No Expiration)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET, 
    { expiresIn: '10d' }
  ); // expiration set for 10 days need to change after hackathon. !!! TODO. 
};

// Verify Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Decode Token (optional, without verifying)
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  verifyToken,
  decodeToken,
};