import openTask from './taskeditor'
import { hideForm, getDateToday } from "./taskeditor";
import { projects } from './sidebar';
import { getMonth, getWeek, getTomorrow } from './upcoming';

const todaySidebar = document.querySelector('.today');
todaySidebar.addEventListener('click', populateToday);

export default function populateToday() {
  populateHeading();
  populateDate();
  updateTitle();
  hideUpcoming();
  showToday();
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

function goToTaskAdder() { // For + Button in header
  populateToday();
  openTask();
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
overdueContainer.appendChild(overdueLine);

// Today
export const todayContainer = document.createElement('li');
todayContainer.classList.add('today-container');
agendaList.insertBefore(todayContainer, addTaskButton);
const today = document.createElement('h2');
today.innerHTML = 'Today';
today.classList.add('h2');
today.classList.add('today-h2');
todayContainer.appendChild(today);
const todayLine = document.createElement('hr');
todayLine.classList.add('line');
todayContainer.appendChild(todayLine);

// This Week
const weekContainer = document.createElement('li');
weekContainer.classList.add('week-container');
weekContainer.style.display = 'none';
agendaList.insertBefore(weekContainer, addTaskButton);
const thisWeek = document.createElement('h2');
thisWeek.innerHTML = 'This week';
thisWeek.classList.add('h2');
thisWeek.classList.add('week-h2');
weekContainer.appendChild(thisWeek);
const weekLine = document.createElement('hr');
weekLine.classList.add('line');
weekContainer.appendChild(weekLine);

// This Month
const monthContainer = document.createElement('li');
monthContainer.classList.add('month-container');
monthContainer.style.display = 'none';
agendaList.insertBefore(monthContainer, addTaskButton);
const thisMonth = document.createElement('h2');
thisMonth.innerHTML = 'This month';
thisMonth.classList.add('h2');
thisMonth.classList.add('month-h2');
monthContainer.appendChild(thisMonth);
const monthLine = document.createElement('hr');
monthLine.classList.add('line');
monthContainer.appendChild(monthLine);

export function hideToday() {
  todayContainer.style.display = 'none';
  overdueContainer.style.display = 'none';
}

export function showUpcoming() {
  weekContainer.style.display = 'block';
  monthContainer.style.display = 'block';
}

function hideUpcoming() {
  weekContainer.style.display = 'none';
  monthContainer.style.display = 'none';
}

let todaysTasks = [];
function getTodaysTasks() {
  todaysTasks = [];
  const today = getDateToday();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date === today));
    tasks.forEach(task => todaysTasks.push(task));
  });
  todaysTasks.reverse().sort((a, b) => (a.complete > b.complete) ? 1 : -1);
}

let overdueTasks = [];
function getOverdueTasks() {
  overdueTasks = [];
  const today = getDateToday();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date < today));
    tasks.forEach(task => overdueTasks.push(task));
  });
  overdueTasks.reverse().sort((a, b) => (a.date > b.date) ? -1 : 1);
  overdueTasks.sort((a, b) => (a.complete > b.complete) ? 1 : -1);
}

function checkForOverdue() {
  const page = document.querySelector('.agenda-heading');
  if (overdueTasks.length > 0 && page.innerHTML === 'Today') {
    overdueContainer.style.display = 'block';
    overdueLine.style.display = 'block';
    today.style.marginTop = '40px';
  } else {
    overdueContainer.style.display = 'none';
    overdueLine.style.display = 'none';
    today.style.marginTop = '12px';
  }
}

function showToday() {
  todayContainer.style.display = 'block';
  checkForOverdue();
}

function populateTodaysTasks() {
  getTodaysTasks();
  if (todaysTasks.length > 0) {
    todaysTasks.reverse().forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      todayContainer.insertBefore(line, todayLine.nextSibling); // agendalist
      const li = document.createElement('li');
      li.classList.add('task-container');
      todayContainer.insertBefore(li, todayLine.nextSibling); // agendalist
      const buttonWrap = document.createElement('span');
      buttonWrap.classList.add('task-button-wrapper');
      li.appendChild(buttonWrap);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      buttonWrap.appendChild(checkBox);
      checkBox.addEventListener('click', completeTask);
      const del = document.createElement('span');
      del.innerHTML = '&times;';
      del.classList.add('delete-task');
      del.setAttribute('title', 'Delete task');
      del.addEventListener('click', deleteTask);
      buttonWrap.appendChild(del);
      const name = document.createElement('span');
      name.classList.add('task-name');
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        project.classList.add('complete-project');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        project.classList.add('uncomplete-project');
      }
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
      overdueContainer.insertBefore(line, overdueLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container');
      overdueContainer.insertBefore(li, overdueLine.nextSibling);
      const buttonWrap = document.createElement('span');
      buttonWrap.classList.add('task-button-wrapper');
      li.appendChild(buttonWrap);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      buttonWrap.appendChild(checkBox);
      checkBox.addEventListener('click', completeTask);
      const del = document.createElement('span');
      del.innerHTML = '&times;';
      del.classList.add('delete-task');
      del.setAttribute('title', 'Delete task');
      del.addEventListener('click', deleteTask);
      buttonWrap.appendChild(del);
      const name = document.createElement('span');
      name.classList.add('task-name');
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        project.classList.add('complete-project');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        project.classList.add('uncomplete-project');
      }
    });
  }
  return;
}

let weeksTasks = [];
function getWeeksTasks() {
  weeksTasks = [];
  const tomorrow = getTomorrow();
  const week = getWeek();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date >= tomorrow && task.date <= week));
    tasks.forEach(task => weeksTasks.push(task));
  });
  weeksTasks.reverse().sort((a, b) => (a.date > b.date) ? -1 : 1);
  weeksTasks.sort((a, b) => (a.complete > b.complete) ? 1 : -1);
}

let monthsTasks = [];
function getMonthsTasks() {
  monthsTasks = [];
  const week = getWeek();
  const month = getMonth();
  projects.forEach(project => {
    const tasks = project.tasks.filter(task => (task.date > week && task.date <= month));
    tasks.forEach(task => monthsTasks.push(task));
  });
  monthsTasks.reverse().sort((a, b) => (a.date > b.date) ? -1 : 1);
  monthsTasks.sort((a, b) => (a.complete > b.complete) ? 1 : -1);
}

function checkForWeek() {
  const page = document.querySelector('.agenda-heading');
  if (weeksTasks.length > 0 && page.innerHTML === 'Upcoming') {
    weekContainer.style.display = 'block';
  } else {
    weekContainer.style.display = 'none';
  }
}

function checkForMonth() {
  const page = document.querySelector('.agenda-heading');
  if (monthsTasks.length > 0 && page.innerHTML === 'Upcoming') {
    monthContainer.style.display = 'block';
    if (weeksTasks.length > 0) {
      thisMonth.style.marginTop = '40px';
    }
  } else {
    monthContainer.style.display = 'none';
  }
}

function populateWeeksTasks() {
  getWeeksTasks();
  if (weeksTasks.length > 0) {
    weeksTasks.reverse().forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      weekContainer.insertBefore(line, weekLine.nextSibling); // agendalist
      const li = document.createElement('li');
      li.classList.add('task-container');
      weekContainer.insertBefore(li, weekLine.nextSibling); // agendalist
      const buttonWrap = document.createElement('span');
      buttonWrap.classList.add('task-button-wrapper');
      li.appendChild(buttonWrap);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      buttonWrap.appendChild(checkBox);
      checkBox.addEventListener('click', completeTask);
      const del = document.createElement('span');
      del.innerHTML = '&times;';
      del.classList.add('delete-task');
      del.setAttribute('title', 'Delete task');
      del.addEventListener('click', deleteTask);
      buttonWrap.appendChild(del);
      const name = document.createElement('span');
      name.classList.add('task-name');
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        project.classList.add('complete-project');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        project.classList.add('uncomplete-project');
      }
    });
  }
  return;
}

function populateMonthsTasks() {
  getMonthsTasks();
  if (monthsTasks.length > 0) {
    monthsTasks.reverse().forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      monthContainer.insertBefore(line, monthLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container');
      monthContainer.insertBefore(li, monthLine.nextSibling);
      const buttonWrap = document.createElement('span');
      buttonWrap.classList.add('task-button-wrapper');
      li.appendChild(buttonWrap);
      const checkBox = document.createElement('span');
      checkBox.classList.add('check-box');
      buttonWrap.appendChild(checkBox);
      checkBox.addEventListener('click', completeTask);
      const del = document.createElement('span');
      del.innerHTML = '&times;';
      del.classList.add('delete-task');
      del.setAttribute('title', 'Delete task');
      del.addEventListener('click', deleteTask);
      buttonWrap.appendChild(del);
      const name = document.createElement('span');
      name.classList.add('task-name');
      li.appendChild(name);
      const desc = document.createElement('span');
      desc.classList.add('task-desc');
      li.appendChild(desc);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      li.appendChild(project);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        project.classList.add('complete-project');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        project.classList.add('uncomplete-project');
      }
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
  populateWeeksTasks();
  populateMonthsTasks();
  checkForOverdue();
  checkForWeek();
  checkForMonth();
}

function strikeText(text) {
  return text.split('').map(char => char + '\u0336').join('');
}

function completeTask(e) {
  const striked = e.target.parentNode.nextSibling.innerHTML;
  const taskName = striked.replace(/[\u0336]/g, '');
  const projectName = e.target.parentNode.nextSibling.nextSibling.nextSibling.innerHTML;
  const project = projects.find(project => project.project === projectName);
  const task = project.tasks.find(task => task.name === taskName);
  task.complete === 0 ? task.complete = 1 : task.complete = 0;
  localStorage.setItem('projects', JSON.stringify(projects));
  populateTasks();
}

function deleteTask(e) {
  const striked = e.target.parentNode.nextSibling.innerHTML;
  const taskName = striked.replace(/[\u0336]/g, '');
  const projectName = e.target.parentNode.nextSibling.nextSibling.nextSibling.innerHTML;
  const project = projects.find(project => project.project === projectName);
  const task = project.tasks.findIndex(task => task.name === taskName);
  project.tasks.splice(task, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  populateTasks();
}

populateTasks();