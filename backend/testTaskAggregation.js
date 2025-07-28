const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');

dotenv.config();

const testTaskAggregation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const taskId = '6885e10aed7517ece60aa781';
    const metrics = await Task.calculateTaskMetrics(taskId);

    console.log('Task Metrics:', metrics);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error testing task aggregation:', error);
    mongoose.connection.close();
  }
};

testTaskAggregation();