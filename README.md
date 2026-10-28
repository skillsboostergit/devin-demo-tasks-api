# devin-demo-tasks-api

A small task tracker API built with Express, used for Devin demos.

## Run it

- Install: npm install
- Test: npm test
- Start: npm start (serves http://localhost:3000)

## Endpoints

- GET /health (public)
- GET /tasks, GET /tasks/:id, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id (need the x-api-key header)

## Configuration

Set these environment variables, or use the defaults: PORT, API_KEY, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX.
