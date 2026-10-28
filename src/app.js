const express = require("express");
const config = require("./config");
const requestLogger = require("./middleware/requestLogger");
const { apiKeyAuth } = require("./middleware/auth");
const { createRateLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const healthRoutes = require("./routes/health");
const taskRoutes = require("./routes/tasks");
const { createMemoryStore } = require("./store/memoryStore");
const { createTaskService } = require("./services/taskService");

// Builds the Express app. Options let tests override the rate limit and the store.
function createApp(options = {}) {
  const app = express();
  const store = options.store || createMemoryStore();
  const taskService = createTaskService(store);
  const rateLimit = { ...config.rateLimit, ...(options.rateLimit || {}) };

  app.use(express.json());
  app.use(requestLogger);

  // Public route: no API key and no rate limit.
  app.use("/health", healthRoutes);

  // Everything under /tasks requires an API key and is rate limited per key.
  app.use("/tasks", apiKeyAuth, createRateLimiter(rateLimit), taskRoutes(taskService));

  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
