// Turns thrown errors into JSON responses. Errors with a `status` keep it; others become 500.
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ error: message });
};
