const request = require("supertest");
const { createApp } = require("../src/app");

describe("API key authentication", () => {
  test("rejects requests without an API key", async () => {
    const res = await request(createApp()).get("/tasks");
    expect(res.statusCode).toBe(401);
  });

  test("rejects requests with a wrong API key", async () => {
    const res = await request(createApp()).get("/tasks").set("x-api-key", "wrong");
    expect(res.statusCode).toBe(403);
  });

  test("health check does not need an API key", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
