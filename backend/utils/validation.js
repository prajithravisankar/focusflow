const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

const registerValidation = [
    check('firstName').notEmpty().withMessage('first name is required').isLength({ min: 2, max: 50 }).withMessage('first name must be between 2 and 50 characters'), 
    check('lastName').notEmpty().withMessage('last name is required').isLength({ min: 2, max: 50 }).withMessage('last name must be between 2 and 50 characters'), 
    check('email').isEmail().withMessage('please provide valid email address'), 
    check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').matches(/\d/).withMessage('Password must contain at least one number'), 
];


// login validation schema
const loginValidation = [
    check('email').isEmail().withMessage('please provide a valid email address'), 
    check('password').notEmpty().withMessage('password is required'),
];

// Task validation rules
const taskValidation = [
  check('title').notEmpty().withMessage('Task title is required').isLength({ max: 200 }).withMessage('Task title cannot exceed 200 characters'),
  check('description').optional().isLength({ max: 1000 }).withMessage('Task description cannot exceed 1000 characters'),
  check('completed').optional().isBoolean().withMessage('Completed status must be a boolean'),
];

// middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// Session validation rules
const sessionValidation = [
  check('sessionType').notEmpty().withMessage('Session type is required').isIn(['focus', 'break']).withMessage('Session type must be either "focus" or "break"'),
  check('duration').notEmpty().withMessage('Duration is required').isFloat({ gt: 0 }).withMessage('Duration must be a positive number'),
  check('taskId').optional()
    .custom(async (value, { req }) => {
      if (req.body.sessionType === 'focus' && !value) {
        throw new Error('Task ID is required for focus sessions');
      }
      if (value) {
        const task = await Task.findOne({ _id: value, userId: req.user?.id });
        if (!task) {
          throw new Error('Task does not exist or you do not have permission to access it');
        }
      }
      return true;
    }),
  check('startTime').notEmpty().withMessage('Start time is required').isISO8601().withMessage('Start time must be a valid ISO 8601 date'),
  check('endTime').notEmpty().withMessage('End time is required').isISO8601().withMessage('End time must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
];

module.exports = {
    registerValidation, 
    loginValidation, 
    taskValidation,
    sessionValidation, 
    validate,
};