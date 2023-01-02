addAddTaskListener();

const list = document.querySelector('.agenda-list');

export default function openTaskAdder() {
  hideButton();
  showForm();
}

function showForm() {
  const editorListItem = document.createElement('li');
  editorListItem.classList.add('li-form');
  list.appendChild(editorListItem);

  const form = document.createElement('form');
  form.classList.add('editor');
  editorListItem.appendChild(form);

  const editor = document.createElement('div');
  form.appendChild(editor);

  const inputs = document.createElement('div');
  inputs.classList.add('inputs');
  editor.appendChild(inputs);

  const taskNameInput = document.createElement('input');
  taskNameInput.setAttribute('placeholder', 'Task Name');
  inputs.appendChild(taskNameInput);
  
  const taskDescriptInput = document.createElement('input');
  taskDescriptInput.setAttribute('placeholder', 'Task Description');
  inputs.appendChild(taskDescriptInput);

  const dateProjectBar = document.createElement('div');
  dateProjectBar.classList.add('info-bar');
  editor.appendChild(dateProjectBar);

  const calLabel = document.createElement('label');
  calLabel.setAttribute('for', 'calendar');
  calLabel.innerHTML = 'Due: '
  dateProjectBar.appendChild(calLabel);

  const calendar = document.createElement('input');
  calendar.setAttribute('type', 'date');
  calendar.setAttribute('name', 'calendar');
  const today = new Date().toISOString().split('T')[0];
  calendar.setAttribute('min', today);
  calendar.classList.add('info-buttons');
  calendar.innerHTML = 'Today';
  dateProjectBar.appendChild(calendar);

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('info-buttons');
  projectBtn.innerHTML = 'Project';
  dateProjectBar.appendChild(projectBtn);

  const saveBar = document.createElement('div');
  saveBar.classList.add('save-bar');
  form.appendChild(saveBar);

  const cancel = document.createElement('button');
  cancel.classList.add('save-bar-buttons');
  cancel.classList.add('cancel');
  cancel.innerHTML = 'Cancel';
  saveBar.appendChild(cancel);
  addCancelListener();

  const addTask = document.createElement('button');
  addTask.classList.add('save-bar-buttons');
  addTask.classList.add('addTask');
  addTask.innerHTML = 'Add Task';
  saveBar.appendChild(addTask);
}

function hideForm() {
  const form = document.querySelector('.li-form');
  form.remove();
  showButton();
}

function showButton() {
  const li = document.createElement('li');
  li.classList.add('button-node');
  list.appendChild(li);

  const button = document.createElement('button');
  button.classList.add('agenda-add-task');
  button.innerHTML = 'Add Task';
  li.appendChild(button);

  addAddTaskListener();
}

function hideButton() {
  const button = document.querySelector('.button-node');
  button.remove();
}


function addAddTaskListener() {
  const taskButton = document.querySelector('.agenda-add-task');
  taskButton.addEventListener('click', openTaskAdder);
}

function addCancelListener() {
  const cancelBtn = document.querySelector('.cancel');
  cancelBtn.addEventListener('click', hideForm);
}