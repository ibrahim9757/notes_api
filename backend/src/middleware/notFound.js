<<<<<<< HEAD
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};
=======
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
