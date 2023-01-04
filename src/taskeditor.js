import { projects } from './sidebar';

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
  editor.classList.add('editor-wrapper');
  form.appendChild(editor);

  const inputs = document.createElement('div');
  inputs.classList.add('inputs');
  editor.appendChild(inputs);

  const taskNameInput = document.createElement('input');
  taskNameInput.setAttribute('placeholder', 'Task Name');
  taskNameInput.setAttribute('type', 'text');
  taskNameInput.classList.add('editor-input-top');
  inputs.appendChild(taskNameInput);
  
  const taskDescriptInput = document.createElement('input');
  taskDescriptInput.setAttribute('placeholder', 'Task Description');
  taskDescriptInput.setAttribute('type', 'text');
  taskDescriptInput.classList.add('editor-input-bottom');
  inputs.appendChild(taskDescriptInput);

  const dateProjectBar = document.createElement('div');
  dateProjectBar.classList.add('info-bar');
  editor.appendChild(dateProjectBar);

  const calendarWrapper = document.createElement('span');
  calendarWrapper.classList.add('calendar-wrapper');
  dateProjectBar.appendChild(calendarWrapper);

  const calLabel = document.createElement('label');
  calLabel.classList.add('calendar-label');
  calLabel.setAttribute('for', 'calendar');
  calLabel.innerHTML = 'Due: '
  calendarWrapper.appendChild(calLabel);

  const calendar = document.createElement('input');
  calendar.setAttribute('type', 'date');
  calendar.setAttribute('name', 'calendar');
  const today = new Date().toISOString().split('T')[0];
  calendar.setAttribute('min', today);
  calendar.classList.add('info-buttons');
  calendar.innerHTML = 'Today';
  calendarWrapper.appendChild(calendar);

  addLabelListener();

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('info-buttons');
  projectBtn.classList.add('project-info');
  projectBtn.innerHTML = 'Project';
  dateProjectBar.appendChild(projectBtn);
  addProjectListener();

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
  addTask.classList.add('add-task');
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

function getProjectXY() {
  const projectBtn = document.querySelector('.project-info');
  const rect = projectBtn.getBoundingClientRect();
  console.log(rect)
  const x = rect.left;
  const y = rect.bottom;
  console.log(x);
  console.log(y);
  return [x, y];
}

function openProjectModal(e) {
  e.preventDefault();
  const position = getProjectXY();
  const container = document.querySelector('.modal-container');
  const modal = document.createElement('div');
  modal.classList.add('project-modal');
  modal.style.top = `${position[1]}px`;
  modal.style.left = `${position[0]}px`;
  console.log(position);
  container.appendChild(modal);
  const list = document.createElement('ul');
  list.classList.add('modal-list');
  modal.appendChild(list);

  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('modal-li');
    li.innerHTML = project.project;
    list.appendChild(li);
  });
}

function addProjectListener() {
  const projectBtn = document.querySelector('.project-info');
  projectBtn.addEventListener('click', openProjectModal);
}

function focusDate() {
  const date = document.querySelector('[type="date"]');
  date.focus();
}
function addLabelListener() {
  const label = document.querySelector('.calendar-label');
  label.addEventListener('click', focusDate);
}

function addAddTaskListener() {
  const taskButton = document.querySelector('.agenda-add-task');
  taskButton.addEventListener('click', openTaskAdder);
}

function addCancelListener() {
  const cancelBtn = document.querySelector('.cancel');
  cancelBtn.addEventListener('click', hideForm);
}