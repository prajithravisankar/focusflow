const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Create the task with user association
    const task = await Task.create({
      title,
      description,
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
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    // Fetch tasks for the current user
    const tasks = await Task.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip((page - 1) * limit) // Skip tasks for pagination
      .limit(parseInt(limit)); // Limit the number of tasks

    res.status(200).json({ tasks, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Find the task and verify ownership
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update the task fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

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

module.exports = { createTask, getUserTasks, updateTask, deleteTask };