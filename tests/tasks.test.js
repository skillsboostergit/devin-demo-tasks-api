const request = require("supertest");
const { createApp } = require("../src/app");

const KEY = { "x-api-key": "dev-key" };

describe("tasks API", () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  test("creates a task and returns it with an id", async () => {
    const res = await request(app).post("/tasks").set(KEY).send({ title: "Write README" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ title: "Write README", done: false });
    expect(res.body.id).toBeDefined();
  });

  test("rejects a task without a title", async () => {
    const res = await request(app).post("/tasks").set(KEY).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Title is required");
  });

  test("marks a task as done and filters by status", async () => {
    const created = await request(app).post("/tasks").set(KEY).send({ title: "Ship it" });
    await request(app).patch(`/tasks/${created.body.id}`).set(KEY).send({ done: true });
    const res = await request(app).get("/tasks?done=true").set(KEY);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].done).toBe(true);
  });

  test("returns 404 for a missing task", async () => {
    const res = await request(app).get("/tasks/999").set(KEY);
    expect(res.statusCode).toBe(404);
  });
});
