// filepath: backend/testTaskModel.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');
const User = require('./models/User');

dotenv.config();

const testTaskModel = async () => {
    // VALID TEST
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Connected to MongoDB');

//     // Create a sample user
//     const user = await User.create({
//       firstName: 'TestTaskModelUserFirstName',
//       lastName: 'TestTaskModelUserLastName',
//       email: 'testemailfortaskmodel.user@example.com',
//       password: 'password123', // Assume password hashing is handled in the User model
//     });

//     console.log('User created:', user);

//     // Create sample tasks
//     const task1 = await Task.create({
//       title: 'Sample Task 1',
//       description: 'This is a sample task description',
//       completed: false,
//       userId: user._id,
//     });

//     const task2 = await Task.create({
//       title: 'Sample Task 2',
//       completed: true,
//       userId: user._id,
//     });

//     console.log('Tasks created:', task1, task2);

//     // Query tasks by user
//     const userTasks = await Task.find({ userId: user._id });
//     console.log('Tasks for user:', userTasks);

//     // Close the database connection
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error testing Task model:', error);
//     mongoose.connection.close();
//   }

    // INVALID TEST 
    // try {
    //     const invalidTask = await Task.create({
    //     title: '', // Invalid: title is required
    //     completed: 'not-a-boolean', // Invalid: must be a boolean
    //     userId: user._id,
    //     });
    // } catch (error) {
    //     console.error('Validation error:', error.message);
    // }
};

testTaskModel();