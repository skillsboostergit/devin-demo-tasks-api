const request = require("supertest");
const { createApp } = require("../src/app");

describe("rate limiting", () => {
  test("returns 429 after the limit is reached", async () => {
    const app = createApp({ rateLimit: { windowMs: 60000, max: 2 } });
    const key = { "x-api-key": "dev-key" };
    await request(app).get("/tasks").set(key);
    await request(app).get("/tasks").set(key);
    const res = await request(app).get("/tasks").set(key);
    expect(res.statusCode).toBe(429);
    expect(res.body.error).toBe("Too many requests");
  });
});
