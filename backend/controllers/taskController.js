const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      priority = 'medium',
      estimatedPomodoros = 1,
      scheduledDate,
      dueDate,
      completed = false 
    } = req.body;

    // Create the task with user association
    const task = await Task.create({
      title,
      description,
      priority,
      estimatedPomodoros,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed,
      userId: req.user.id, // `req.user` is set by authMiddleware
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      priority = '', 
      completed = '',
      date = '', // For filtering by specific date
      dateType = 'scheduled' // 'scheduled' or 'due'
    } = req.query;

    // Build query filter
    const filter = { userId: req.user.id };

    // Add search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add priority filter
    if (priority) {
      filter.priority = priority;
    }

    // Add completed filter
    if (completed !== '') {
      filter.completed = completed === 'true';
    }

    // Add date filter
    if (date) {
      const filterDate = new Date(date);
      const startOfDay = new Date(filterDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(filterDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (dateType === 'due') {
        filter.dueDate = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      } else {
        // Default to scheduled date
        filter.scheduledDate = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      }
    }

    // Get total count for pagination
    const totalTasks = await Task.countDocuments(filter);

    // Fetch tasks with pagination
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({ 
      tasks, 
      currentPage: parseInt(page),
      totalPages,
      totalTasks,
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      completed, 
      priority,
      estimatedPomodoros,
      scheduledDate,
      dueDate 
    } = req.body;

    // Find the task and verify ownership
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update the task fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (priority !== undefined) task.priority = priority;
    if (estimatedPomodoros !== undefined) task.estimatedPomodoros = estimatedPomodoros;
    if (scheduledDate !== undefined) task.scheduledDate = scheduledDate ? new Date(scheduledDate) : null;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task and verify ownership
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks for a specific date (both scheduled and due)
const getTasksByDate = async (req, res) => {
  try {
    const { date } = req.params; // Expected format: YYYY-MM-DD
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const filterDate = new Date(date);
    const startOfDay = new Date(filterDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(filterDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get tasks scheduled for this date
    const scheduledTasks = await Task.find({
      userId: req.user.id,
      scheduledDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ createdAt: -1 });

    // Get tasks due on this date
    const dueTasks = await Task.find({
      userId: req.user.id,
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ createdAt: -1 });

    // Combine and deduplicate tasks (in case a task is both scheduled and due on the same date)
    const taskIds = new Set();
    const allTasks = [];

    scheduledTasks.forEach(task => {
      if (!taskIds.has(task._id.toString())) {
        taskIds.add(task._id.toString());
        allTasks.push({ ...task.toObject(), taskType: 'scheduled' });
      }
    });

    dueTasks.forEach(task => {
      if (!taskIds.has(task._id.toString())) {
        taskIds.add(task._id.toString());
        allTasks.push({ ...task.toObject(), taskType: 'due' });
      } else {
        // If task is already in the list, mark it as both scheduled and due
        const existingTask = allTasks.find(t => t._id.toString() === task._id.toString());
        if (existingTask) {
          existingTask.taskType = 'both';
        }
      }
    });

    res.status(200).json({
      date,
      tasks: allTasks,
      totalTasks: allTasks.length,
      scheduledCount: scheduledTasks.length,
      dueCount: dueTasks.length
    });
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get calendar data with task counts for each day
const getCalendarData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let weekStart;
    
    // If startDate is provided, use it as the week start
    if (startDate && startDate !== 'undefined') {
      // Parse as local date to avoid timezone issues
      const parts = startDate.split('-');
      weekStart = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
      // If no start date provided, calculate current week start (Sunday)
      const today = new Date();
      weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    }

    // Generate 7 days of calendar data
    const calendarDates = [];
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
      
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Only count tasks if the date is valid
      let scheduledCount = 0;
      let dueCount = 0;

      try {
        // Count tasks for this date
        scheduledCount = await Task.countDocuments({
          userId: req.user.id,
          scheduledDate: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        });

        dueCount = await Task.countDocuments({
          userId: req.user.id,
          dueDate: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        });
      } catch (countError) {
        console.error('Error counting tasks for date:', currentDate, countError);
        // Continue with zero counts if there's an error
      }

      // Format date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      calendarDates.push({
        date: dateString,
        dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: currentDate.getDate().toString(),
        month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
        year: currentDate.getFullYear().toString(),
        isToday: currentDate.getTime() === todayLocal.getTime(),
        isWeekend: [0, 6].includes(currentDate.getDay()),
        taskCount: scheduledCount + dueCount,
        scheduledCount,
        dueCount,
        hasTasks: (scheduledCount + dueCount) > 0
      });
    }

    // Calculate previous and next week dates
    const prevWeekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7);
    const nextWeekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
    
    // Format week start dates
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    res.status(200).json({
      data: calendarDates,
      startDate: formatDate(weekStart),
      prevWeekStart: formatDate(prevWeekStart),
      nextWeekStart: formatDate(nextWeekStart)
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  createTask, 
  getUserTasks, 
  updateTask, 
  deleteTask, 
  getTasksByDate, 
  getCalendarData 
};