// Test the date calculation logic
const testCalendarDates = () => {
  console.log('Testing calendar date logic...\n');
  
  // Current date
  const today = new Date();
  console.log('Today:', today.toDateString());
  
  // Calculate week start (Sunday)
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  console.log('Week start (Sunday):', weekStart.toDateString());
  
  // Format date function
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Generate 7 days
  const calendarDates = [];
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
    
    const dateString = formatDate(currentDate);
    
    calendarDates.push({
      date: dateString,
      dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: currentDate.getDate().toString(),
      month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
      year: currentDate.getFullYear().toString(),
      isToday: currentDate.getTime() === todayLocal.getTime(),
      isWeekend: [0, 6].includes(currentDate.getDay()),
      formattedDate: currentDate.toDateString()
    });
  }
  
  console.log('\nCalendar dates:');
  calendarDates.forEach((date, i) => {
    console.log(`Day ${i}: ${date.formattedDate} -> ${date.date} (${date.dayName} ${date.dayNumber} ${date.month}) ${date.isToday ? '← TODAY' : ''}`);
  });
  
  // Test navigation
  const prevWeekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7);
  const nextWeekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
  
  console.log('\nNavigation:');
  console.log('Previous week start:', prevWeekStart.toDateString(), '->', formatDate(prevWeekStart));
  console.log('Current week start:', weekStart.toDateString(), '->', formatDate(weekStart));
  console.log('Next week start:', nextWeekStart.toDateString(), '->', formatDate(nextWeekStart));
  
  // Test the period formatting
  const startDate = calendarDates[0].date;
  const endDate = calendarDates[6].date;
  const startDateObj = new Date(startDate + 'T00:00:00');
  const endDateObj = new Date(endDate + 'T00:00:00');
  
  const startMonth = startDateObj.toLocaleDateString('en-US', { month: 'long' });
  const endMonth = endDateObj.toLocaleDateString('en-US', { month: 'long' });
  const year = startDateObj.getFullYear();
  
  let period;
  if (startMonth === endMonth) {
    period = `${startMonth} ${startDateObj.getDate()}-${endDateObj.getDate()}, ${year}`;
  } else {
    period = `${startMonth} ${startDateObj.getDate()} - ${endMonth} ${endDateObj.getDate()}, ${year}`;
  }
  
  console.log('\nFormatted period:', period);
};

testCalendarDates();
