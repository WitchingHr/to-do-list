const taskButton = document.querySelector('.agenda-add-task');
taskButton.addEventListener('click', openTaskAdder);

const list = document.querySelector('.agenda-list');

export default function openTaskAdder() {
  hideButton();
  createEditor();
}

function createEditor() {
  const editorListItem = document.createElement('li');
  list.appendChild(editorListItem);

  const form = document.createElement('form');
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

  const dateBtn = document.createElement('button');
  dateBtn.classList.add('info-buttons');
  dateBtn.innerHTML = 'Today';
  dateProjectBar.appendChild(dateBtn);

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

  const addTask = document.createElement('button');
  addTask.classList.add('save-bar-buttons');
  addTask.classList.add('addTask');
  addTask.innerHTML = 'Add Task';
  saveBar.appendChild(addTask);
}

function hideButton() {
  const button = document.querySelector('.button-node');
  button.remove();
}

function createButton() {
  const li = document.createElement('li');
  li.classList.add('button-node');
  list.appendChild(li);

  const button = document.createElement('button');
  button.classList.add('agenda-add-task');
  button.innerHTML = 'Add Task';
  li.appendChild(button);
}