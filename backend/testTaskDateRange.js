// Test the new task date range logic
const testTaskDateRange = () => {
  console.log('Testing task date range logic...\n');
  
  // Mock tasks
  const tasks = [
    {
      id: 1,
      title: "Task 1: Scheduled only",
      scheduledDate: new Date('2025-07-28'),
      dueDate: null
    },
    {
      id: 2, 
      title: "Task 2: Due only",
      scheduledDate: null,
      dueDate: new Date('2025-07-30')
    },
    {
      id: 3,
      title: "Task 3: Range task",
      scheduledDate: new Date('2025-07-27'),
      dueDate: new Date('2025-08-01')
    },
    {
      id: 4,
      title: "Task 4: Single day",
      scheduledDate: new Date('2025-07-29'),
      dueDate: new Date('2025-07-29')
    }
  ];
  
  // Test dates
  const testDates = [
    '2025-07-26', // Before all tasks
    '2025-07-27', // Task 3 starts
    '2025-07-28', // Task 1 scheduled, Task 3 continues
    '2025-07-29', // Task 1 continues, Task 3 continues, Task 4 exact
    '2025-07-30', // Task 1 continues, Task 2 due, Task 3 continues
    '2025-07-31', // Task 1 continues, Task 2 continues, Task 3 continues  
    '2025-08-01', // Task 1 continues, Task 2 continues, Task 3 ends
    '2025-08-02'  // Only Task 1 and 2 continue
  ];
  
  console.log('Tasks:');
  tasks.forEach(task => {
    console.log(`${task.id}. ${task.title}`);
    console.log(`   Scheduled: ${task.scheduledDate?.toDateString() || 'None'}`);
    console.log(`   Due: ${task.dueDate?.toDateString() || 'None'}`);
  });
  
  console.log('\nExpected task visibility by date:');
  
  testDates.forEach(dateStr => {
    const testDate = new Date(dateStr);
    const activeTasks = [];
    
    tasks.forEach(task => {
      let isActive = false;
      
      // Check if task is active on this date
      if (task.scheduledDate && task.dueDate) {
        // Has both dates - active if date is between them (inclusive)
        isActive = testDate >= task.scheduledDate && testDate <= task.dueDate;
      } else if (task.scheduledDate && !task.dueDate) {
        // Only scheduled - active if date is >= scheduled date
        isActive = testDate >= task.scheduledDate;
      } else if (!task.scheduledDate && task.dueDate) {
        // Only due - active if date is <= due date
        isActive = testDate <= task.dueDate;
      }
      
      if (isActive) {
        let taskType = 'active';
        if (task.scheduledDate && testDate.getTime() === task.scheduledDate.getTime()) {
          taskType = 'scheduled';
        }
        if (task.dueDate && testDate.getTime() === task.dueDate.getTime()) {
          taskType = taskType === 'scheduled' ? 'both' : 'due';
        }
        
        activeTasks.push(`${task.id} (${taskType})`);
      }
    });
    
    console.log(`${testDate.toDateString()}: Tasks [${activeTasks.join(', ') || 'none'}]`);
  });
};

testTaskDateRange();
