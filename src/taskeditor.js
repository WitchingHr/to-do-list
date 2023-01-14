import { closeSidebar, projects } from './sidebar';
import { populateTasks } from './today';

addAddTaskListener();

const heading = document.querySelector('.agenda-heading');
const list = document.querySelector('.agenda-list');

function closeSmoke() {
  const smoke = document.querySelector('.smoke-screen');
  if (smoke.style.display === 'block') {
    smoke.style.display = 'none';
  }
}

export default function openTaskAdder() {
  if (window.innerWidth <= 880) {
    closeSidebar();
  }
  closeSmoke();
  hideButton();
  createForm();
  addEnterListener();
}

function addEnterListener() {
  window.addEventListener('keydown', submitTaskByEnter);
}

function submitTaskByEnter(e) {
  if (e.key === 'Enter') {
    submitTask(e);
  }
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
  taskNameInput.oninput = () => {
    taskNameInput.setCustomValidity('');
  }

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
  calendar.setAttribute('min', getDateToday());
  calendar.setAttribute('value', getDateToday());
  calendar.classList.add('info-buttons');
  calendar.innerHTML = 'Today';
  calendarWrapper.appendChild(calendar);
  addLabelListener();

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('info-buttons');
  projectBtn.classList.add('project-info');
  if (heading.innerHTML != 'Today' && heading.innerHTML != 'Upcoming') {
    projectBtn.innerHTML = heading.innerHTML;
  } else {
    projectBtn.innerHTML = 'To Do';
  }
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

  taskNameInput.focus();
  const scrollInterval = setInterval(() => {
    list.scrollTop = list.scrollHeight;
    clearInterval(scrollInterval);
  }, 250);

}

export function hideForm() {
  const form = document.querySelector('.li-form');
  if (form) {
    form.remove();
    window.removeEventListener('keydown', submitTaskByEnter);
    showButton();
    const metaViewport = document.querySelector('meta[name=viewport]');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  }
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
  let x;
  const width = projectBtn.offsetWidth;
  if (window.innerWidth <= 480) {
    x = rect.left + width - 200;
  } else {
    x = rect.left;
  }
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
  const projectList = document.createElement('ul');
  projectList.classList.add('modal-list');
  modal.appendChild(projectList);
  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('modal-li');
    li.innerHTML = project.project;
    projectList.appendChild(li);
    li.addEventListener('click', updateProjectBtn);
    li.addEventListener('click', resetValidity);
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
  const bool = projects[index].tasks.some(task => task.name === name);
  if (bool) {
    nameInput.setCustomValidity('Task already exists in this project');
  }
  let validity = form.reportValidity();
  if (validity) {
    projects[index].tasks.reverse().push(Task(name, description, project, date, complete));
    localStorage.setItem('projects', JSON.stringify(projects));
    hideForm();
    navigator.vibrate(50);
    populateTasks();
  }
}

export function Task(name, description, project, date, complete) {
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

function resetValidity() {
  const input = document.querySelector('.editor-input-top');
  input.setCustomValidity('');
}