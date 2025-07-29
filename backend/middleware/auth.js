const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Auth check - Headers:', {
    authorization: authHeader ? 'Bearer [token]' : 'MISSING',
    method: req.method,
    path: req.path
  });

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Auth failed: No valid Authorization header');
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth success for user:', decoded.email);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.log('Auth failed: Invalid token -', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;