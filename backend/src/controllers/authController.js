// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return next(new AppError('User already exists with this email', 400));

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email }
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError('Invalid credentials', 401));

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) return next(new AppError('Invalid credentials', 401));

  const token = generateToken(user._id);
  res.status(200).json({ success: true, message: 'Login successful', data: { token, user: { id: user._id, name: user.name, email: user.email } } });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt } } });
});