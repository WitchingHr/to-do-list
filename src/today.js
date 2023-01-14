import openTask from './taskeditor'
import { hideForm, getDateToday } from "./taskeditor";
import { projects, project, toggleSidebarSmallScreen } from './sidebar';
import { getMonth, getWeek, getTomorrow } from './upcoming';
import { hideDeleteProject } from './projects';

const todaySidebar = document.querySelector('.today');
todaySidebar.addEventListener('click', populateToday);

export default function populateToday() {
  populateHeading();
  populateDate();
  updateTitle();
  hideDeleteProject();
  hideUpcoming();
  hideProject();
  showToday();
  checkForForm();
  if (window.innerWidth <= 880) {
    toggleSidebarSmallScreen();
  }
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

// Someday
const somedayContainer = document.createElement('li');
somedayContainer.classList.add('someday-container');
somedayContainer.style.display = 'none';
agendaList.insertBefore(somedayContainer, addTaskButton);
const someday = document.createElement('h2');
someday.innerHTML = 'Someday';
someday.classList.add('h2');
someday.classList.add('someday-h2');
somedayContainer.appendChild(someday);
const somedayLine = document.createElement('hr');
somedayLine.classList.add('line');
somedayContainer.appendChild(somedayLine);

// Project
const projectContainer = document.createElement('li');
projectContainer.classList.add('project-container');
projectContainer.style.display = 'none';
agendaList.insertBefore(projectContainer, addTaskButton);
const projectHead = document.createElement('h2');
projectHead.innerHTML = 'Project';
projectHead.classList.add('h2');
projectHead.classList.add('project-h2');
projectContainer.appendChild(projectHead);
const projectLine = document.createElement('hr');
projectLine.classList.add('line');
projectContainer.appendChild(projectLine);

export function hideToday() {
  todayContainer.style.display = 'none';
  overdueContainer.style.display = 'none';
}

export function showUpcoming() {
  weekContainer.style.display = 'block';
  monthContainer.style.display = 'block';
  somedayContainer.style.display = 'block';
}

export function hideUpcoming() {
  weekContainer.style.display = 'none';
  monthContainer.style.display = 'none';
  somedayContainer.style.display = 'none';
}

export function showProject() {
  projectContainer.style.display = 'block';
}

export function hideProject() {
  projectContainer.style.display = 'none';
}

let todaysTasks = [];
function getTodaysTasks() {
  todaysTasks = [];
  const todaysDate = getDateToday();
  projects.forEach(projectObj => {
    const tasks = projectObj.tasks.filter(task => (task.date === todaysDate));
    tasks.forEach(task => todaysTasks.push(task));
  });
  todaysTasks.sort((a, b) => (a.name > b.name) ? -1 : 1);
  todaysTasks.sort((a, b) => (a.complete > b.complete) ? -1 : 1);
}

let overdueTasks = [];
function getOverdueTasks() {
  overdueTasks = [];
  const todaysDate = getDateToday();
  projects.forEach(projectObj => {
    const tasks = projectObj.tasks.filter(task => (task.date < todaysDate));
    tasks.forEach(task => overdueTasks.push(task));
  });
  overdueTasks.sort((a, b) => (a.name > b.name) ? -1 : 1);
  overdueTasks.sort((a, b) => (a.date > b.date) ? -1 : 1);
  overdueTasks.sort((a, b) => (a.complete > b.complete) ? -1 : 1);
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
    todaysTasks.forEach(task => {
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
      const dateProject = document.createElement('span');
      dateProject.classList.add('task-date-project');
      li.appendChild(dateProject);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      dateProject.appendChild(project);
      const date = document.createElement('span');
      date.classList.add('task-date');
      date.innerHTML = formatDate(task.date);
      dateProject.appendChild(date);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        desc.classList.add('desc-complete');
        project.classList.add('complete-project');
        date.classList.add('date-complete');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        desc.classList.add('desc-uncomplete');
        project.classList.add('uncomplete-project');
        date.classList.add('date-uncomplete');
      }
    });
  }
}

function populateOverdueTasks() {
  getOverdueTasks();
  if (overdueTasks.length > 0) {
    overdueTasks.forEach(task => {
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
      const dateProject = document.createElement('span');
      dateProject.classList.add('task-date-project');
      li.appendChild(dateProject);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      dateProject.appendChild(project);
      const date = document.createElement('span');
      date.classList.add('task-date');
      date.innerHTML = formatDate(task.date);
      dateProject.appendChild(date);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        desc.classList.add('desc-complete');
        project.classList.add('complete-project');
        date.classList.add('date-complete');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        desc.classList.add('desc-uncomplete');
        project.classList.add('uncomplete-project');
        date.classList.add('date-uncomplete');
      }
    });
  }
}

let weeksTasks = [];
function getWeeksTasks() {
  weeksTasks = [];
  const tomorrow = getTomorrow();
  const week = getWeek();
  projects.forEach(projectObj => {
    const tasks = projectObj.tasks.filter(task => (task.date >= tomorrow && task.date <= week));
    tasks.forEach(task => weeksTasks.push(task));
  });
  weeksTasks.sort((a, b) => (a.name > b.name) ? -1 : 1);
  weeksTasks.sort((a, b) => (a.date > b.date) ? 1 : -1);
  weeksTasks.sort((a, b) => (a.complete > b.complete) ? -1 : 1);
}

let monthsTasks = [];
function getMonthsTasks() {
  monthsTasks = [];
  const week = getWeek();
  const month = getMonth();
  projects.forEach(projectObj => {
    const tasks = projectObj.tasks.filter(task => (task.date > week && task.date <= month));
    tasks.forEach(task => monthsTasks.push(task));
  });
  monthsTasks.sort((a, b) => (a.name > b.name) ? -1 : 1);
  monthsTasks.sort((a, b) => (a.date > b.date) ? 1 : -1);
  monthsTasks.sort((a, b) => (a.complete > b.complete) ? -1 : 1);
}

let somedaysTasks = [];
function getSomedaysTasks() {
  somedaysTasks = [];
  const month = getMonth();
  projects.forEach(projectObj => {
    const tasks = projectObj.tasks.filter(task => (task.date > month));
    tasks.forEach(task => somedaysTasks.push(task));
  });
  somedaysTasks.sort((a, b) => (a.name > b.name) ? -1 : 1);
  somedaysTasks.sort((a, b) => (a.date > b.date) ? 1 : -1);
  somedaysTasks.sort((a, b) => (a.complete > b.complete) ? -1 : 1);
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

function checkForSomeday() {
  const page = document.querySelector('.agenda-heading');
  if (somedaysTasks.length > 0 && page.innerHTML === 'Upcoming') {
    somedayContainer.style.display = 'block';
    if (monthsTasks.length > 0) {
      someday.style.marginTop = '40px';
    }
  } else {
    somedayContainer.style.display = 'none';
  }
}

function populateWeeksTasks() {
  getWeeksTasks();
  if (weeksTasks.length > 0) {
    weeksTasks.forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      weekContainer.insertBefore(line, weekLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container');
      weekContainer.insertBefore(li, weekLine.nextSibling);
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
      const dateProject = document.createElement('span');
      dateProject.classList.add('task-date-project');
      li.appendChild(dateProject);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      dateProject.appendChild(project);
      const date = document.createElement('span');
      date.classList.add('task-date');
      date.innerHTML = formatDate(task.date);
      dateProject.appendChild(date);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        desc.classList.add('desc-complete');
        project.classList.add('complete-project');
        date.classList.add('date-complete');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        desc.classList.add('desc-uncomplete');
        project.classList.add('uncomplete-project');
        date.classList.add('date-uncomplete');
      }
    });
  }
}

function populateMonthsTasks() {
  getMonthsTasks();
  if (monthsTasks.length > 0) {
    monthsTasks.forEach(task => {
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
      const dateProject = document.createElement('span');
      dateProject.classList.add('task-date-project');
      li.appendChild(dateProject);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      dateProject.appendChild(project);
      const date = document.createElement('span');
      date.classList.add('task-date');
      date.innerHTML = formatDate(task.date);
      dateProject.appendChild(date);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        desc.classList.add('desc-complete');
        project.classList.add('complete-project');
        date.classList.add('date-complete');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        desc.classList.add('desc-uncomplete');
        project.classList.add('uncomplete-project');
        date.classList.add('date-uncomplete');
      }
    });
  }
}

function populateSomedaysTasks() {
  getSomedaysTasks();
  if (somedaysTasks.length > 0) {
    somedaysTasks.forEach(task => {
      const line = document.createElement('hr');
      line.classList.add('line');
      line.classList.add('task-line');
      somedayContainer.insertBefore(line, somedayLine.nextSibling);
      const li = document.createElement('li');
      li.classList.add('task-container');
      somedayContainer.insertBefore(li, somedayLine.nextSibling);
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
      const dateProject = document.createElement('span');
      dateProject.classList.add('task-date-project');
      li.appendChild(dateProject);
      const project = document.createElement('span');
      project.classList.add('task-project');
      project.innerHTML = task.project;
      dateProject.appendChild(project);
      const date = document.createElement('span');
      date.classList.add('task-date');
      date.innerHTML = formatDate(task.date);
      dateProject.appendChild(date);

      if (task.complete === 1) {
        checkBox.setAttribute('title', 'Uncomplete task');
        del.style.display = 'block';
        name.innerHTML = strikeText(task.name);
        li.classList.add('complete');
        desc.innerHTML = strikeText(task.description);
        desc.classList.add('desc-complete');
        project.classList.add('complete-project');
        date.classList.add('date-complete');
      } else {
        checkBox.setAttribute('title', 'Complete task');
        del.style.display = 'none';
        name.innerHTML = task.name;
        desc.innerHTML = task.description;
        desc.classList.add('desc-uncomplete');
        project.classList.add('uncomplete-project');
        date.classList.add('date-uncomplete');
      }
    });
  }
}

let projectTasks = [];
function getProjectTasks() {
  projectTasks = [];
  const projectObj = projects.find(obj => obj.project === project);
  projectTasks = projectObj.tasks;
  projectTasks.reverse().sort((a, b) => (a.date > b.date) ? -1 : 1);
  projectTasks.sort((a, b) => (a.complete > b.complete) ? 1 : -1);
}

function populateProjectTasks() {
  getProjectTasks();
  projectTasks.reverse().forEach(task => {
    const line = document.createElement('hr');
    line.classList.add('line');
    line.classList.add('task-line');
    projectContainer.insertBefore(line, projectLine.nextSibling);
    const li = document.createElement('li');
    li.classList.add('task-container');
    projectContainer.insertBefore(li, projectLine.nextSibling);
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
    const dateProject = document.createElement('span');
    dateProject.classList.add('task-date-project');
    li.appendChild(dateProject);
    const project = document.createElement('span');
    project.classList.add('task-project');
    project.innerHTML = task.project;
    dateProject.appendChild(project);
    const date = document.createElement('span');
    date.classList.add('task-date');
    date.innerHTML = formatDate(task.date);
    dateProject.appendChild(date);

    if (task.complete === 1) {
      checkBox.setAttribute('title', 'Uncomplete task');
      del.style.display = 'block';
      name.innerHTML = strikeText(task.name);
      li.classList.add('complete');
      desc.innerHTML = strikeText(task.description);
      desc.classList.add('desc-complete');
      project.classList.add('complete-project');
      date.classList.add('date-complete');
    } else {
      checkBox.setAttribute('title', 'Complete task');
      del.style.display = 'none';
      name.innerHTML = task.name;
      desc.innerHTML = task.description;
      desc.classList.add('desc-uncomplete');
      project.classList.add('uncomplete-project');
      date.classList.add('date-uncomplete');
    }
  });
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
  populateSomedaysTasks();
  checkForOverdue();
  checkForWeek();
  checkForMonth();
  checkForSomeday();
  populateProjectTasks();
}

function strikeText(text) {
  return text.split('').map(char => char + '\u0336').join('');
}

function completeTask(e) {
  const striked = e.target.parentNode.nextSibling.innerHTML;
  const taskName = striked.replace(/[\u0336]/g, '');
  const projectName = e.target.parentNode.nextSibling.nextSibling.nextSibling.firstChild.innerHTML;
  const project = projects.find(project => project.project === projectName);
  const task = project.tasks.find(task => task.name === taskName);
  task.complete === 0 ? task.complete = 1 : task.complete = 0;
  localStorage.setItem('projects', JSON.stringify(projects));
  populateTasks();
}

function deleteTask(e) {
  const striked = e.target.parentNode.nextSibling.innerHTML;
  const taskName = striked.replace(/[\u0336]/g, '');
  const projectName = e.target.parentNode.nextSibling.nextSibling.nextSibling.firstChild.innerHTML;
  const projectObject = projects.find(projectObj => projectObj.project === projectName);
  const task = projectObject.tasks.findIndex(taskObj => taskObj.name === taskName);
  projectObject.tasks.splice(task, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  populateTasks();
}

function formatDate(date) {
  const array = date.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = array[1] - 1;
  const day = array[2].split('');
  let newDay;
  if (day[0] === '0') {
    newDay = day[1];
  } else {
    newDay = day.join('');
  }
  return months[month] + ' ' + newDay;
}

populateTasks();