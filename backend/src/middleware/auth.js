// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  
  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Check if token exists
  if (!token) {
    return next(new AppError('You are not logged in. Please log in to access this route.', 401));
  }
  
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Get user from token
  const user = await User.findById(decoded.id);
  
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }
  
  // Grant access
  req.user = user;
  next();
});