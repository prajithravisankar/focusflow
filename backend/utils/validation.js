const { check, validationResult } = require('express-validator');

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

module.exports = {
    registerValidation, 
    loginValidation, 
    taskValidation, 
    validate,
};