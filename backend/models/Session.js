const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: function () {
        return this.sessionType === 'focus';
      }, // Task is required for focus sessions
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionType: {
      type: String,
      enum: ['focus', 'break'], // Only 'focus' or 'break' allowed
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [1, 'Duration must be a positive number'], // Minimum duration is 1 minute
    },
    actualDuration: {
      type: Number,
      default: 0, // Tracks how much time was actually spent
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    pausedDuration: {
      type: Number,
      default: 0, // Tracks total paused time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

sessionSchema.statics.calculateUserStats = async function (userId, startDate, endDate) {
    const query = { userId };
    if (startDate || endDate) {
        query.startTime = {};
        if (startDate) query.startTime.$gte = new Date(startDate);
        if (endDate) query.startTime.$lte = new Date(endDate);
    }

    const sessions = await this.find(query);

    const totalFocusTime = sessions.filter(session => session.sessionType === 'focus').reduce((total, session) => total + session.actualDuration, 0);
    const totalBreakTime = sessions.filter(session => session.sessionType === 'break').reduce((total, session) => total + session.actualDuration, 0);
    const focusSessions = sessions.filter(session => session.sessionType === 'focus').length;
    const breakSessions = sessions.filter(session => session.sessionType === 'break').length;

    const breakToFocusRatio = focusSessions > 0 ? (breakSessions / focusSessions).toFixed(2) : 0;

    return {
        totalFocusTime, 
        totalBreakTime, 
        focusSessions, 
        breakSessions, 
        breakToFocusRatio,
    };
};

module.exports = mongoose.model('Session', sessionSchema);