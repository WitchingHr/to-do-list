import openTask from './taskeditor'
import { hideForm, getDateToday } from "./taskeditor";
import { projects } from './sidebar';

const todaySidebar = document.querySelector('.today');
todaySidebar.addEventListener('click', populateToday);

export default function populateToday() {
  populateHeading();
  populateDate();
  updateTitle();
  checkForForm();
}

export function checkForForm() {
  const form = document.querySelector('.li-form');
  if (form) {
    hideForm();
  }
}

function populateHeading() {
  const heading = document.querySelector('.agenda-heading');
  heading.innerHTML = 'Today';
}

function populateDate() {
  const d = document.querySelector('.header-date');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = new Date().getDay();
  const date = new Date().getDate();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = new Date().getMonth();
  d.innerHTML = `${days[day]} ${months[month]} ${date}`;
}

function updateTitle() {
  document.title = 'To Do: Today';
}

const add = document.querySelector('.add');
add.addEventListener('click', goToTaskAdder);

function goToTaskAdder() {
  populateToday();
  openTask();
}

let todaysTasks = [];
function getTodaysTasks() {
  todaysTasks = [];
  const today = getDateToday();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date === today));
    tasks.forEach(task => todaysTasks.push(task));
  });
}

let overdueTasks = [];
function getOverdueTasks() {
  overdueTasks = [];
  const today = getDateToday();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date < today));
    tasks.forEach(task => overdueTasks.push(task));
  });
}

const agendaList = document.querySelector('.agenda-list');
const addTaskButton = document.querySelector('.button-node');

// Overdue
const overdueContainer = document.createElement('li');
overdueContainer.classList.add('overdue-container');
overdueContainer.style.display = 'none';
agendaList.insertBefore(overdueContainer, addTaskButton);
const overdue = document.createElement('h2');
overdue.innerHTML = 'Overdue';
overdue.classList.add('h2');
overdueContainer.appendChild(overdue);
const overdueLine = document.createElement('hr');
overdueLine.classList.add('line');
overdueLine.style.display = 'none';
agendaList.insertBefore(overdueLine, addTaskButton);


// Today
const todayContainer = document.createElement('li');
todayContainer.classList.add('today-container');
agendaList.insertBefore(todayContainer, addTaskButton);
const today = document.createElement('h2');
today.innerHTML = 'Today';
today.classList.add('h2');
today.classList.add('today-h2');
todayContainer.appendChild(today);
const todayLine = document.createElement('hr');
todayLine.classList.add('line');
agendaList.insertBefore(todayLine, addTaskButton);

function checkForOverdue() {
  if (overdueTasks.length > 0) {
    overdueContainer.style.display = 'block';
    overdueLine.style.display = 'block';
    today.style.marginTop = '40px';
  } else {
    overdueContainer.style.display = 'none';
    overdueLine.style.display = 'none';
    today.style.marginTop = '12px';
  }
}

function populateTodaysTasks() {
  getTodaysTasks();
  if (todaysTasks.length > 0) {
    todaysTasks.reverse().forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      agendaList.insertBefore(line, todayLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container'); // use task container to delete
      agendaList.insertBefore(li, todayLine.nextSibling);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      li.appendChild(checkBox);
      const innerCheckBox = document.createElement('span');
      innerCheckBox.classList.add('inner');
      checkBox.appendChild(innerCheckBox);
      const name = document.createElement('span');
      name.classList.add('task-name');
      name.innerHTML = task.name;
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      desc.innerHTML = task.description;
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);
    });
  }
  return;
}

function populateOverdueTasks() {
  getOverdueTasks();
  if (overdueTasks.length > 0) {
    overdueTasks.reverse().forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      agendaList.insertBefore(line, overdueLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container'); // use task container to delete
      agendaList.insertBefore(li, overdueLine.nextSibling);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      li.appendChild(checkBox);
      const name = document.createElement('span');
      name.classList.add('task-name');
      name.innerHTML = task.name;
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      desc.innerHTML = task.description;
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);
    });
  }
  return;
}

export function populateTasks() {
  const printed = document.querySelectorAll('.task-container');
  printed.forEach(task => task.remove());
  const lines = document.querySelectorAll('.task-line');
  lines.forEach(line => line.remove());
  populateTodaysTasks();
  populateOverdueTasks();
  checkForOverdue();
}