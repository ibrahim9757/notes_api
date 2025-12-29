<<<<<<< HEAD
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => `${err.param}: ${err.msg}`).join('. ');
    return next(new AppError(message, 400));
  }
  next();
};
=======
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => `${err.param}: ${err.msg}`).join('. ');
    return next(new AppError(message, 400));
  }
  next();
};
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
