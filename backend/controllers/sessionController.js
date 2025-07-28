const Session = require('../models/Session');
const Task = require('../models/Task');

const startSession = async (req, res) => {
  try {
    const { taskId, sessionType, duration, startTime, endTime } = req.body;

    // Validate task existence for focus sessions
    if (sessionType === 'focus') {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
    }

    // Create session
    const session = await Session.create({
      taskId: sessionType === 'focus' ? taskId : null,
      userId: req.user.id,
      sessionType,
      duration,
      startTime,
      endTime,
    });

    res.status(201).json({ message: 'Session started successfully', sessionId: session._id });
  } catch (error) {
    console.error('Error starting session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, actualDuration, pausedDuration } = req.body;

    const session = await Session.findById(id);
    if (!session || session.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Session not found or not authorized' });
    }

    // Handle pause/resume functionality
    if (action === 'pause') {
      // When pausing, we add the time spent since last resume to pausedDuration
      session.pausedDuration = (session.pausedDuration || 0) + (pausedDuration || 0);
    } else if (action === 'resume') {
      // Resume doesn't change pausedDuration, it's already tracked
      // pausedDuration parameter here would be ignored for resume
    }

    // Update actual duration
    if (actualDuration) {
      session.actualDuration = actualDuration;
    }

    await session.save();

    res.status(200).json({ message: 'Session updated successfully', session });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const completeSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);
    if (!session || session.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Session not found or not authorized' });
    }

    // Mark session as completed
    session.completed = true;
    session.actualDuration = Math.max(session.actualDuration, session.duration);

    // Update task's total time spent
    if (session.taskId) {
      const task = await Task.findById(session.taskId);
      task.totalTimeSpent = (task.totalTimeSpent || 0) + session.actualDuration;
      await task.save();
    }

    await session.save();

    res.status(200).json({ message: 'Session completed successfully', session });
  } catch (error) {
    console.error('Error completing session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSessionHistory = async (req, res) => {
  try {
    const { taskId, sessionType, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = { userId: req.user.id };

    if (taskId) query.taskId = taskId;
    if (sessionType) query.sessionType = sessionType;
    if (startDate || endDate) {
      query.startTime = {};
      if (startDate) query.startTime.$gte = new Date(startDate);
      if (endDate) query.startTime.$lte = new Date(endDate);
    }

    const sessions = await Session.find(query)
      .sort({ startTime: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ sessions, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error('Error fetching session history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTaskAnalytics = async (req, res) => {
  try {
    const { taskId } = req.params;

    const metrics = await Task.calculateTaskMetrics(taskId);
    res.status(200).json({ message: 'Task analytics retrieved successfully', metrics });
  } catch (error) {
    console.error('Error fetching task analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProductivity = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const stats = await Session.calculateUserStats(req.user.id, startDate, endDate);
    res.status(200).json({ message: 'User productivity stats retrieved successfully', stats });
  } catch (error) {
    console.error('Error fetching user productivity stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { startSession, updateSession, completeSession, getSessionHistory, getTaskAnalytics, getUserProductivity };