const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Session = require('./models/Session');
const Task = require('./models/Task');
const User = require('./models/User');

dotenv.config();

const testSessionModel = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a sample user
    const user = await User.create({
      firstName: 'SessionTestUser',
      lastName: 'LastName',
      email: 'sessiontestuser@example.com',
      password: 'password123',
    });

    console.log('User created:', user);

    // Create a sample task
    const task = await Task.create({
      title: 'Sample Task for Session',
      description: 'This is a sample task for session testing',
      completed: false,
      userId: user._id,
    });

    console.log('Task created:', task);

    // Create a sample session
    const session = await Session.create({
      taskId: task._id,
      userId: user._id,
      sessionType: 'focus',
      duration: 25,
      startTime: new Date(),
      endTime: new Date(Date.now() + 25 * 60 * 1000),
      completed: true,
    });

    console.log('Session created:', session);

    // Query sessions by user
    const userSessions = await Session.find({ userId: user._id }).populate('taskId');
    console.log('Sessions for user:', userSessions);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error testing Session model:', error);
    mongoose.connection.close();
  }
};

testSessionModel();