<<<<<<< HEAD
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
=======
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
