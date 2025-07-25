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

// middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

module.exports = {
    registerValidation, 
    loginValidation, 
    validate,
};