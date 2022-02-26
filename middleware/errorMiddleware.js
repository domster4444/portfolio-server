const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
module.exports = globalErrorHandler;
