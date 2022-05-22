const todo = {
  tasks: [],
  createTask(data) {
    this.tasks.push({
      id: Math.round(Math.random() * new Date().getTime()),
      content: data.content,
      completed: false,
    });
  },
  getTasks() {
    return this.tasks;
  },
  getTask(id) {
    return this.tasks.find((task) => task.id == id);
  },
  updateTask(id, data) {
    const task = this.getTask(id);

    if (task) {
      task.content = data.content || task.content;
      task.completed = data.completed;
    }
  },
  deleteTasks() {
    this.tasks = [];
  },
  deleteTask(id) {
    const index = this.tasks.findIndex((task) => task.id == id);

    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  },
};
