const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { Redis } = require('@upstash/redis');
const { registerValidation, validate } = require('./utils/validation');




dotenv.config();

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5050;

// used for testing. 
// app.post('/api/test-register', registerValidation, validate, (req, res) => {
//   res.status(200).json({ message: 'Validation passed!' });
// });




const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

redis.set('test', 'upstash redis connected').then(() => {
    redis.get('test').then((value) => {
        console.log(value);
    });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error occurred!' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});