// In-memory storage for tasks. Swap this module for a database-backed one in production.
function createMemoryStore() {
  const tasks = new Map();
  let nextId = 1;

  return {
    all() {
      return [...tasks.values()];
    },
    findById(id) {
      return tasks.get(String(id)) || null;
    },
    insert(data) {
      const task = { id: String(nextId++), createdAt: new Date().toISOString(), ...data };
      tasks.set(task.id, task);
      return task;
    },
    update(id, changes) {
      const task = { ...tasks.get(String(id)), ...changes };
      tasks.set(String(id), task);
      return task;
    },
    remove(id) {
      tasks.delete(String(id));
    },
  };
}

module.exports = { createMemoryStore };
