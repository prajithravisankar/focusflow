const mongoose = require('mongoose');
const Session = require('./Session');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      maxlength: [200, 'Task title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Task description cannot exceed 1000 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    estimatedPomodoros: {
      type: Number,
      default: 1,
      min: [1, 'Estimated pomodoros must be at least 1'],
      max: [20, 'Estimated pomodoros cannot exceed 20'],
    },
    completedPomodoros: {
      type: Number,
      default: 0,
      min: [0, 'Completed pomodoros cannot be negative'],
    },
    scheduledDate: {
      type: Date,
      default: null, // Tasks can be created without scheduling
    },
    dueDate: {
      type: Date,
      default: null, // Tasks can be created without due dates
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
      min: [0, 'Total time spent cannot be negative'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add indexes for efficient querying
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, scheduledDate: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, completed: 1 });

taskSchema.statics.calculateTaskMetrics = async function (taskId) {
  const sessions = await Session.find({ taskId });

  const totalTimeSpent = sessions.reduce((total, session) => total + session.actualDuration, 0);
  const completedSessions = sessions.filter(session => session.completed).length;
  const incompleteSessions = sessions.length - completedSessions;
  const averageSessionDuration = sessions.length > 0
    ? totalTimeSpent / sessions.length
    : 0;

  const plannedTime = sessions.reduce((total, session) => total + session.duration, 0);
  const efficiency = plannedTime > 0
    ? (totalTimeSpent / plannedTime) * 100
    : 0;

  return {
    totalTimeSpent,
    completedSessions,
    incompleteSessions,
    averageSessionDuration,
    efficiency: efficiency.toFixed(2), // Percentage
  };
};

module.exports = mongoose.model('Task', taskSchema);