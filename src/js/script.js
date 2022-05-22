const $form = document.querySelector('form');
const $todo = document.querySelector('#todo');
const $tasks = document.querySelector('#tasks');
const $cleanAll = document.querySelector('#clean-all');

document.body.onload = () => {
  const tasks = getLocalStorage();

  if (!!tasks) {
    todo.tasks = tasks;
    createTodoList($tasks);
    addCleanTask();
    isCompletedTask();
    setButtonCleanAllVisibility();
  }
};

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  if ($todo.value) {
    todo.createTask({
      content: $todo.value,
    });

    $todo.value = '';
    createTodoList();
    addCleanTask();
    isCompletedTask();
    setButtonCleanAllVisibility();
    setLocalStorage(todo.tasks);
  }
});

$cleanAll.addEventListener('click', () => {
  $tasks.innerHTML = '';
  todo.deleteTasks();
  setButtonCleanAllVisibility();
  setLocalStorage(todo.tasks);
});

function createTodoList() {
  $tasks.innerHTML = '';
  todo.tasks.forEach((task) => {
    if (task.completed) {
      $tasks.insertAdjacentHTML(
        'afterbegin',
        `<div>
      <input type="checkbox" id="${task.id}" class="task" checked>
      <label for="${task.id}">${task.content}</label>
      <span class="clean-task color-danger">X</span>
      </div>`
      );
    } else {
      $tasks.insertAdjacentHTML(
        'afterbegin',
        `<div>
      <input type="checkbox" id="${task.id}" class="task">
      <label for="${task.id}">${task.content}</label>
      <span class="clean-task color-danger">X</span>
      </div>`
      );
    }
  });
}

function addCleanTask() {
  const $cleanTasks = document.querySelectorAll('.clean-task');

  $cleanTasks.forEach((cleanTask) => {
    cleanTask.addEventListener('click', (event) => {
      const id = event.target.parentElement.querySelector('input').id;
      console.log(id);
      todo.deleteTask(id);
      event.target.parentElement.remove();
      setLocalStorage(todo.tasks);
    });
  });
}

function isCompletedTask() {
  const $checkboxTasks = document.querySelectorAll('input[type=checkbox]');

  $checkboxTasks.forEach((task) => {
    task.addEventListener('change', (event) => {
      const id = event.target.id;
      const checked = event.target.checked;
      todo.updateTask(id, { completed: checked });
      setLocalStorage(todo.tasks);
    });
  });
}

function setButtonCleanAllVisibility() {
  if (todo.tasks.length == 0) {
    $cleanAll.style.cssText = 'display: none;';
  } else {
    $cleanAll.style.cssText = 'display: block; margin: 0 auto;';
  }
}
