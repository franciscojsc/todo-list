document.body.onload = () => {
  const tasks = document.querySelector('#tasks');

  if (getLocalStorage()) {
    tasks.innerHTML = getLocalStorage();
  }

  addCleanTask();
  setButtonCleanAllVisibility();
};

function setButtonCleanAllVisibility() {
  const tasks = document.querySelector('#tasks');
  const cleanAll = document.querySelector('#clean-all');

  if (tasks.childNodes.length == 0) {
    cleanAll.style.cssText = 'display: none;';
  } else {
    cleanAll.style.cssText = 'display: block; margin: 0 auto;';
  }
}

const cleanAll = document.querySelector('#clean-all');

cleanAll.addEventListener('click', (event) => {
  const tasks = document.querySelector('#tasks');
  tasks.innerHTML = '';
  setButtonCleanAllVisibility();
  setLocalStorage(tasks);
});

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createTask();
});

function createTask() {
  const tasks = document.querySelector('#tasks');
  const todo = document.querySelector('#todo');

  if (validateTask(todo.value, tasks)) {
    todo.value = '';
    setButtonCleanAllVisibility();
    setLocalStorage(tasks);
  }
}

function validateTask(todo, tasks) {
  if (!!todo) {
    addTask(tasks, todo);
    return true;
  }
  return false;
}

function addTask(tasks, todo) {
  const idTask = Math.random() * Math.random();
  tasks.insertAdjacentHTML(
    'afterbegin',
    `<div>
    <input type="checkbox" id="task${idTask}" class="task">
    <label for="task${idTask}">${todo}</label>
    <span class="clean-task color-danger">X</span>
    </div>`
  );
  addCleanTask();
}

function addCleanTask() {
  const cleanTasks = document.querySelectorAll('.clean-task');
  const tasks = document.querySelector('#tasks');

  cleanTasks.forEach((cleanTask) => {
    cleanTask.addEventListener('click', (event) => {
      event.target.parentElement.remove();
      setButtonCleanAllVisibility();
      setLocalStorage(tasks);
    });
  });
}

function getLocalStorage() {
  return localStorage.getItem('tasks');
}

function setLocalStorage(tasks) {
  localStorage.setItem('tasks', tasks.innerHTML);
}
