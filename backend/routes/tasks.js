const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { taskValidation, validate } = require('../utils/validation');
const authMiddleware = require('../middleware/auth');

// Create Task
router.post('/', authMiddleware, taskValidation, validate, taskController.createTask);

// Get User Tasks
router.get('/', authMiddleware, taskController.getUserTasks);

// Get Calendar Data
router.get('/calendar', authMiddleware, taskController.getCalendarData);

// Get Tasks by Date
router.get('/date/:date', authMiddleware, taskController.getTasksByDate);

// Update Task
router.put('/:id', authMiddleware, taskValidation, validate, taskController.updateTask);

// Delete Task
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;