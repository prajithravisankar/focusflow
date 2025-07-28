const redis = require('../config/upstash');

const rateLimit = (key, limit, windowInSeconds) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip; // Get the IP address of the client
      const redisKey = `${key}:${ip}`;

      // Increment the count for this IP
      const response = await redis.incr(redisKey);

      if (response === 1) {
        // Set expiration for the key if it's the first request
        await redis.expire(redisKey, windowInSeconds);
      }

      if (response > limit) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
      }

      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If Redis fails, we allow the request to proceed rather than blocking the entire application
      console.warn('Rate limiting disabled due to Redis connection error');
      next();
    }
  };
};

module.exports = rateLimit;