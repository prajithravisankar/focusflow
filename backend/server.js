const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { Redis } = require('@upstash/redis');


dotenv.config();

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;


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