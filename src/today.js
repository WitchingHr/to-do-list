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
  console.log(todaysTasks);
}

const agendaList = document.querySelector('.agenda-list');
const addTaskButton = document.querySelector('.button-node');

const overdueContainer = document.createElement('li');
agendaList.insertBefore(overdueContainer, addTaskButton);
const todayContainer = document.createElement('li');
agendaList.insertBefore(todayContainer, addTaskButton);

// Overdue
const overdue = document.createElement('h2');
overdue.innerHTML = 'Overdue';
overdue.classList.add('h2');
overdueContainer.appendChild(overdue);

// Today
const today = document.createElement('h2');
today.innerHTML = 'Today';
today.classList.add('h2');
todayContainer.appendChild(today);

export function populateTodaysTask() {
  const printed = document.querySelectorAll('.task-container');
  printed.forEach(task => task.remove());
  const lines = document.querySelectorAll('.line');
  lines.forEach(line => line.remove());
  getTodaysTasks();
  todaysTasks.reverse().forEach(task => {
    const line = document.createElement('hr');
    line.classList.add('line');
    agendaList.insertBefore(line, todayContainer.nextSibling);
    const li = document.createElement('li');
    li.classList.add('task-container'); // use task container to delete
    agendaList.insertBefore(li, todayContainer.nextSibling);
    const checkBox = document.createElement('span');
    checkBox.classList.add('check-box');
    checkBox.innerHTML = 'o';
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