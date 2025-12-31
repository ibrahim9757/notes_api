const { body } = require('express-validator');

exports.createCategoryValidation = [
  body('name').notEmpty().withMessage('Category name is required').isLength({ max: 30 }).withMessage('Category name cannot exceed 30 characters'),
  body('color').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color')
];

exports.updateCategoryValidation = [
  body('name').optional().isLength({ max: 30 }).withMessage('Category name cannot exceed 30 characters'),
  body('color').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Please provide a valid hex color')
];