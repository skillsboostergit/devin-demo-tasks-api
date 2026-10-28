const express = require("express");

// HTTP layer for tasks: reads the request, calls the service, sends the response.
module.exports = function taskRoutes(taskService) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(taskService.list({ done: req.query.done }));
  });

  router.get("/:id", (req, res, next) => {
    try {
      res.json(taskService.get(req.params.id));
    } catch (err) {
      next(err);
    }
  });

  router.post("/", (req, res, next) => {
    try {
      res.status(201).json(taskService.create(req.body));
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", (req, res, next) => {
    try {
      res.json(taskService.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", (req, res, next) => {
    try {
      taskService.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
