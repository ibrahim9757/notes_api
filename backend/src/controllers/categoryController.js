const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json(categories);
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to access this category', 403));
  }

  res.status(200).json({
    success: true,
    data: { category }
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: { category }
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to update this category', 403));
  }

  category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: { category }
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to delete this category', 403));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
    data: {}
  });
});

