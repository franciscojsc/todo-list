const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const tasks = document.querySelector('#tasks');
  const todo = document.querySelector('#todo').value;

  if (!!todo) {
    const idTask = Math.random() * Math.random();
    tasks.insertAdjacentHTML(
      'afterbegin',
      `<div>
        <input type="checkbox" id="task${idTask}" class="task">
        <label for="task${idTask}">${todo}</label>
      </div>`
    );
  }
});
