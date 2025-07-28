// filepath: backend/testUserModel.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testUserModel = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find the user by email
    const user = await User.findOne({ email: 'john.doe@example.com' });
    if (!user) {
      console.log('User not found');
      return;
    }

    // Test password comparison
    const isMatch = await user.comparePassword('password123');
    console.log('Password match:', isMatch); // Should log: true

    const isWrongMatch = await user.comparePassword('wrongpassword');
    console.log('Wrong password match:', isWrongMatch); // Should log: false

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

testUserModel();