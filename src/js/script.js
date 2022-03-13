const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createTask();
});

function createTask() {
  const tasks = document.querySelector('#tasks');
  const todo = document.querySelector('#todo');
  const todoValue = todo.value;

  if (validateTask(todoValue, tasks)) todo.value = '';
}

function validateTask(todoValue, tasks) {
  if (!!todoValue) {
    addTask(tasks, todoValue);
    return true;
  }
  return false;
}

function addTask(tasks, todoValue) {
  const idTask = Math.random() * Math.random();
  tasks.insertAdjacentHTML(
    'afterbegin',
    `<div>
        <input type="checkbox" id="task${idTask}" class="task">
        <label for="task${idTask}">${todoValue}</label>
        <span class="clean-task">X</span>
      </div>`
  );
  addCleanTask();
}

function addCleanTask() {
  const cleanTasks = document.querySelectorAll('.clean-task');

  cleanTasks.forEach((cleanTask) => {
    cleanTask.addEventListener('click', (event) => {
      event.target.parentElement.remove();
    });
  });
}
