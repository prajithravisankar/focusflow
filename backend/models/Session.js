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

module.exports = mongoose.model('Session', sessionSchema);