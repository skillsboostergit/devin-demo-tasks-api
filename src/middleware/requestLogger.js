// Logs method, path, status code and duration for every request (silent during tests).
module.exports = function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
    }
  });
  next();
};
