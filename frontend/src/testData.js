// Test Data for Analytics Demo
// This script adds sample data to localStorage to demonstrate the analytics

// Sample tasks with various dates
const sampleTasks = [
  // Today's tasks
  { id: 1, title: "Review code", completed: true, createdAt: new Date().toISOString(), category: "Development" },
  { id: 2, title: "Write documentation", completed: true, createdAt: new Date().toISOString(), category: "Documentation" },
  { id: 3, title: "Plan meeting", completed: false, createdAt: new Date().toISOString(), category: "Planning" },
  
  // This week's tasks
  { id: 4, title: "Bug fixes", completed: true, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), category: "Development" },
  { id: 5, title: "Testing", completed: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), category: "QA" },
  { id: 6, title: "Design review", completed: false, createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), category: "Design" },
  
  // This month's tasks
  { id: 7, title: "Project kickoff", completed: true, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), category: "Planning" },
  { id: 8, title: "Database optimization", completed: true, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), category: "Development" },
  { id: 9, title: "User feedback analysis", completed: true, createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), category: "Research" },
  
  // This year's tasks
  { id: 10, title: "Q1 Planning", completed: true, createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), category: "Planning" },
  { id: 11, title: "Feature development", completed: true, createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), category: "Development" },
  { id: 12, title: "Performance testing", completed: true, createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), category: "QA" }
];

// Sample sessions with various dates and durations
const sampleSessions = [
  // Today's sessions
  { id: 1, duration: 45, startTime: new Date().toISOString(), taskId: 1 },
  { id: 2, duration: 30, startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), taskId: 2 },
  
  // This week's sessions
  { id: 3, duration: 60, startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), taskId: 4 },
  { id: 4, duration: 90, startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), taskId: 5 },
  { id: 5, duration: 25, startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), taskId: 6 },
  { id: 6, duration: 50, startTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), taskId: 7 },
  
  // This month's sessions
  { id: 7, duration: 120, startTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), taskId: 8 },
  { id: 8, duration: 75, startTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), taskId: 9 },
  { id: 9, duration: 40, startTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), taskId: 10 },
  
  // This year's sessions
  { id: 10, duration: 180, startTime: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), taskId: 11 },
  { id: 11, duration: 150, startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), taskId: 12 },
  { id: 12, duration: 90, startTime: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), taskId: 1 }
];

// Function to add test data
function addTestData() {
  localStorage.setItem('focusflow_tasks', JSON.stringify(sampleTasks));
  localStorage.setItem('focusflow_sessions', JSON.stringify(sampleSessions));
  
  console.log('✅ Test data added successfully!');
  console.log('📊 Analytics should now show:');
  console.log(`- Tasks completed today: ${sampleTasks.filter(t => new Date(t.createdAt).toDateString() === new Date().toDateString() && t.completed).length}`);
  console.log(`- Tasks completed this week: ${sampleTasks.filter(t => {
    const taskDate = new Date(t.createdAt);
    const weekStart = new Date(Date.now() - (new Date().getDay() * 24 * 60 * 60 * 1000));
    weekStart.setHours(0, 0, 0, 0);
    return taskDate >= weekStart && t.completed;
  }).length}`);
  console.log(`- Time spent today: ${sampleSessions.filter(s => new Date(s.startTime).toDateString() === new Date().toDateString()).reduce((total, s) => total + s.duration, 0)} minutes`);
  console.log('🔄 Refresh the Analytics page to see the data!');
}

// Run the function
addTestData();
