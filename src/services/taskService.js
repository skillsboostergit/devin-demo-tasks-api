// Business rules for tasks. Throws errors with a `status` that the error handler turns into responses.
function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function createTaskService(store) {
  function get(id) {
    const task = store.findById(id);
    if (!task) throw httpError(404, "Task not found");
    return task;
  }

  return {
    list({ done } = {}) {
      const tasks = store.all();
      if (done === "true") return tasks.filter((t) => t.done);
      if (done === "false") return tasks.filter((t) => !t.done);
      return tasks;
    },

    get,

    create({ title, dueDate } = {}) {
      if (typeof title !== "string" || title.trim() === "") {
        throw httpError(400, "Title is required");
      }
      if (title.length > 200) {
        throw httpError(400, "Title must be 200 characters or fewer");
      }
      return store.insert({ title: title.trim(), dueDate: dueDate || null, done: false });
    },

    update(id, changes = {}) {
      get(id);
      const allowed = {};
      if (changes.title !== undefined) allowed.title = String(changes.title).trim();
      if (changes.done !== undefined) allowed.done = Boolean(changes.done);
      if (changes.dueDate !== undefined) allowed.dueDate = changes.dueDate;
      return store.update(id, allowed);
    },

    remove(id) {
      get(id);
      store.remove(id);
    },
  };
}

module.exports = { createTaskService };
