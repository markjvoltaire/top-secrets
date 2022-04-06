module.exports = (req, res, next) => {
  try {
    if (req.user.username !== 'adim') throw new Error('unauthorized');
    next();
  } catch (error) {
    error.status = 404;
  }
  next(error);
};
