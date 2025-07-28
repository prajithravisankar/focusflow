const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find a user to test with
    const users = await User.find({}).limit(5);
    console.log('Found users:', users.map(u => ({ email: u.email, firstName: u.firstName })));

    if (users.length > 0) {
      const testUser = users[0];
      console.log('Testing with user:', testUser.email);
      
      // Test password comparison
      const testPassword = 'password123'; // Try common password
      const isMatch = await testUser.comparePassword(testPassword);
      console.log('Password match for "password123":', isMatch);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
};

testLogin();
