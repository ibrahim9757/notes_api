<<<<<<< HEAD
const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

exports.createNoteValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').optional().custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Category must be a valid ID'),
];

exports.updateNoteValidation = [
  body('title').optional().isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content').optional(),
  body('category').optional().custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Category must be a valid ID')
];

exports.noteIdParamValidation = [
  param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid note id')
];

exports.paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];
=======
const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

exports.createNoteValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').optional().custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Category must be a valid ID'),
];

exports.updateNoteValidation = [
  body('title').optional().isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content').optional(),
  body('category').optional().custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Category must be a valid ID')
];

exports.noteIdParamValidation = [
  param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid note id')
];

exports.paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
