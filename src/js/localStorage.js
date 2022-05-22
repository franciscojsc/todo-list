function getLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function setLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
