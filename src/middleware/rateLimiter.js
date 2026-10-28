// Fixed-window rate limiter, counted per API key and kept in memory.
// Each key may make `max` requests per `windowMs` milliseconds.
function createRateLimiter({ windowMs, max }) {
  const counters = new Map();

  return function rateLimiter(req, res, next) {
    const key = req.apiKey || req.ip;
    const now = Date.now();
    const entry = counters.get(key);

    if (!entry || now - entry.windowStart >= windowMs) {
      counters.set(key, { windowStart: now, count: 1 });
      return next();
    }

    entry.count += 1;
    if (entry.count > max) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  };
}

module.exports = { createRateLimiter };
