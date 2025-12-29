<<<<<<< HEAD
const { body, param, query, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Middleware to check validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// Auth Validations
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Category Validations
exports.createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 1, max: 30 }).withMessage('Category name must be between 1 and 30 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color (e.g., #FF5733)')
];

exports.updateCategoryValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage('Category name must be between 1 and 30 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color (e.g., #FF5733)')
];

// Note Validations
exports.createNoteValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID')
];

exports.updateNoteValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID')
];

// ID Validation
exports.validateMongoId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format')
];

// Query Validations
exports.validateNoteQuery = [
  query('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID'),
  query('archived')
    .optional()
    .isBoolean().withMessage('Archived must be true or false'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];
=======
const { body, param, query, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Middleware to check validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// Auth Validations
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Category Validations
exports.createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 1, max: 30 }).withMessage('Category name must be between 1 and 30 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color (e.g., #FF5733)')
];

exports.updateCategoryValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage('Category name must be between 1 and 30 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color (e.g., #FF5733)')
];

// Note Validations
exports.createNoteValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID')
];

exports.updateNoteValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID')
];

// ID Validation
exports.validateMongoId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format')
];

// Query Validations
exports.validateNoteQuery = [
  query('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID'),
  query('archived')
    .optional()
    .isBoolean().withMessage('Archived must be true or false'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
