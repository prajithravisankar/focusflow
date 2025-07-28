const axios = require('axios');

const BASE_URL = 'http://localhost:5050/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User'
};

const testTask = {
  title: 'Test Calendar Task',
  description: 'This is a test task for calendar functionality',
  scheduledDate: '2025-07-29',
  dueDate: '2025-07-30'
};

async function testCalendarEndpoints() {
  try {
    console.log('Starting calendar endpoint tests...\n');

    // Step 1: Register/Login user
    console.log('1. Registering test user...');
    try {
      await axios.post(`${BASE_URL}/auth/register`, testUser);
      console.log('✓ User registered successfully');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('User already exists, proceeding with login...');
      } else {
        throw error;
      }
    }

    console.log('2. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    const token = loginResponse.data.token;
    console.log('✓ Login successful');

    // Set up headers for authenticated requests
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Step 2: Create a test task with dates
    console.log('3. Creating test task with dates...');
    const taskResponse = await axios.post(`${BASE_URL}/tasks`, testTask, { headers });
    const createdTask = taskResponse.data.task;
    console.log('✓ Task created:', createdTask.title);
    console.log('  Scheduled:', createdTask.scheduledDate);
    console.log('  Due:', createdTask.dueDate);

    // Step 3: Test calendar data endpoint
    console.log('4. Testing calendar data endpoint...');
    const startDate = '2025-07-27'; // Monday of the week
    const endDate = '2025-08-02';   // Sunday of the week
    const calendarResponse = await axios.get(
      `${BASE_URL}/tasks/calendar?startDate=${startDate}&endDate=${endDate}`,
      { headers }
    );
    console.log('✓ Calendar data retrieved:');
    console.log(calendarResponse.data.data);

    // Step 4: Test tasks by date endpoint
    console.log('5. Testing tasks by date endpoint...');
    const dateTasksResponse = await axios.get(
      `${BASE_URL}/tasks/date/2025-07-29`,
      { headers }
    );
    console.log('✓ Tasks for 2025-07-29:');
    console.log(dateTasksResponse.data.tasks.map(task => ({
      title: task.title,
      scheduledDate: task.scheduledDate,
      dueDate: task.dueDate
    })));

    // Step 5: Clean up - delete test task
    console.log('6. Cleaning up test task...');
    await axios.delete(`${BASE_URL}/tasks/${createdTask._id}`, { headers });
    console.log('✓ Test task deleted');

    console.log('\n🎉 All calendar endpoint tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the tests
testCalendarEndpoints();
