const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

console.log('Upstash Redis URL:', process.env.UPSTASH_REDIS_URL);
console.log('Upstash Redis Token:', process.env.UPSTASH_REDIS_TOKEN);

module.exports = redis;