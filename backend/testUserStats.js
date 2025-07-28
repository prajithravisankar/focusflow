const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Session = require('./models/Session');

dotenv.config();

const testUserStats = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const userId = '688659b954b92e2a3f4bdf56';
    const stats = await Session.calculateUserStats(userId);

    console.log('User Productivity Stats:', stats);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error testing user stats:', error);
    mongoose.connection.close();
  }
};

testUserStats();