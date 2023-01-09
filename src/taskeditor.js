import { projects } from './sidebar';
import { populateTasks } from './today';

addAddTaskListener();

const list = document.querySelector('.agenda-list');

export default function openTaskAdder() {
  hideButton();
  createForm();
}

export function getDateToday() {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  const today = (new Date(Date.now() - offset)).toISOString().split('T')[0];
  return today;
}

function createForm() {
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
  taskNameInput.setAttribute('maxlength', '30');
  taskNameInput.required = true;
  taskNameInput.classList.add('editor-input-top');
  inputs.appendChild(taskNameInput);

  const taskDescriptInput = document.createElement('input');
  taskDescriptInput.setAttribute('placeholder', 'Task Description');
  taskDescriptInput.setAttribute('type', 'text');
  taskDescriptInput.setAttribute('maxlength', '60');
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
  calendar.classList.add('calendar');
  calendar.setAttribute('type', 'date');
  calendar.setAttribute('name', 'calendar');

  // calendar.setAttribute('min', getDateToday()); // TURN ME ONNNNNNNNNNNNNNNNNN
  calendar.setAttribute('value', getDateToday());
  calendar.classList.add('info-buttons');
  calendar.innerHTML = 'Today';
  calendarWrapper.appendChild(calendar);
  addLabelListener();

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('info-buttons');
  projectBtn.classList.add('project-info');
  projectBtn.innerHTML = 'To Do';
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
  addTask.addEventListener('click', submitTask);
  addTask.addEventListener('click', populateTasks);

  taskNameInput.focus();
}

export function hideForm() {
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

function getCoordinates() {
  const projectBtn = document.querySelector('.project-info');
  const rect = projectBtn.getBoundingClientRect();
  const x = rect.left;
  const y = rect.bottom;
  return [x, y];
}

function openProjectModal(e) {
  e.preventDefault();
  const position = getCoordinates();
  const container = document.querySelector('.modal-container');
  container.style.display = 'block';
  const modal = document.createElement('div');
  modal.classList.add('project-modal');
  modal.style.top = `${position[1]}px`;
  modal.style.left = `${position[0]}px`;
  container.appendChild(modal);
  const list = document.createElement('ul');
  list.classList.add('modal-list');
  modal.appendChild(list);
  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('modal-li');
    li.innerHTML = project.project;
    list.appendChild(li);
    li.addEventListener('click', updateProjectBtn);
  });
  container.addEventListener('click', closeModalByClick);
}

function closeModal() {
  const modal = document.querySelector('.project-modal');
  const container = document.querySelector('.modal-container');
  modal.remove();
  container.style.display = 'none';
  container.removeEventListener('click', closeModalByClick);
}

function closeModalByClick(e) {
  const container = document.querySelector('.modal-container');
  if (e.target === container) {
    closeModal();
  }
}

function updateProjectBtn(e) {
  const projectBtn = document.querySelector('.project-info');
  projectBtn.innerHTML = e.target.innerHTML;
  closeModal();
}

function focusDate() {
  const date = document.querySelector('[type="date"]');
  date.focus();
}

function submitTask(e) {
  e.preventDefault();
  const nameInput = document.querySelector('.editor-input-top');
  const descInput = document.querySelector('.editor-input-bottom');
  const cal = document.querySelector('.calendar');
  const proj = document.querySelector('.project-info');
  const name = nameInput.value;
  const description = descInput.value;
  const date = cal.value;
  const project = proj.innerHTML;
  const complete = 0;
  const index = projects.findIndex(obj => obj.project === project);
  const form = document.querySelector('.editor');
  let validity = form.reportValidity();
  if (validity) {
    projects[index].tasks.push(Task(name, description, project, date, complete));
    localStorage.setItem('projects', JSON.stringify(projects));
    hideForm();
  }
}

function Task(name, description, project, date, complete) {
  return {
    name,
    description,
    project,
    date,
    complete
  }
}

function addProjectListener() {
  const projectBtn = document.querySelector('.project-info');
  projectBtn.addEventListener('click', openProjectModal);
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