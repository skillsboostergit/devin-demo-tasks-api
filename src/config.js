// Reads all runtime settings from environment variables, with safe defaults for local use.
module.exports = {
  port: Number(process.env.PORT) || 3000,
  apiKey: process.env.API_KEY || "dev-key",
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },
};
