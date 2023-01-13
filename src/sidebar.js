import populateProjectScreen from "./projects";
import { hideForm, Task, getDateToday } from "./taskeditor";
import { getMonth, getTomorrow, getWeek } from "./upcoming";

const sidebar = document.querySelector('.sidebar');
const tasks = document.querySelector('.tasks');

export let isOpen = true;
export default function toggleSidebar() {
  sidebar.classList.toggle('invisible');
  tasks.classList.toggle('stretch');
  if (sidebar.classList.contains('invisible')) {
    isOpen = false;
  } else {
    isOpen = true;
  }
}

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', toggleSidebar);

function toggleButton() {
  const arrow = document.querySelector('.projects-toggle');
  arrow.classList.toggle('toggle');
}

let open = 0;

function closeInputByToggle() {
  if (open === 0) return;
  open = 0;
  const li = document.querySelector('.project-list-item-input');
  li.remove();
}

function clearProjectsFromDOM() {
  const projectListItems = document.querySelectorAll('.project-li');
  projectListItems.forEach(item => {
    item.remove();
  });
}

let view = 1;
function toggleProjectView() {
  if (view === 1) {
    clearProjectsFromDOM();
    view = 0;
    closeInputByToggle();
    return;
  }
  populateProjects();
  view = 1;
}

const projectsToggle = document.querySelector('.projects-toggle-container');
projectsToggle.addEventListener('click', toggleButton);
projectsToggle.addEventListener('click', toggleProjectView);
const projectBar = document.querySelector('.project-click');
projectBar.addEventListener('click', toggleButton);
projectBar.addEventListener('click', toggleProjectView);


function closeInput(e) {
  open = 0;
  e.preventDefault();
  const li = e.target.parentNode.parentNode
  li.remove();
}

const list = document.querySelector('.projects-list');
function openInput() {
  hideForm();
  if (open !== 1) {
    if (view !== 1) {
      view = 1;
      toggleButton();
      populateProjects();
    }
    open = 1;

    const li = document.createElement('li');
    li.classList.add('project-list-item-input');
    list.insertBefore(li, list.firstChild);

    const form = document.createElement('form');
    form.classList.add('project-form');
    li.appendChild(form);
    
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'New Project');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '20');
    input.classList.add('project-input');
    form.appendChild(input);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('close-button');
    form.appendChild(closeBtn);
    closeBtn.addEventListener('click', closeInput);

    addWindowListener();
    input.focus();

    window.setInterval(function() {
      list.scrollTop = list.scrollHeight;
    }, 250);
  }
}

const addProjectBtn = document.querySelector('.add-project-button-container');
addProjectBtn.addEventListener('click', openInput);

export let projects = [];
if (projects.length === 0 && localStorage.projects) {
  projects = JSON.parse(localStorage.projects);
} else {
  projects.push(Project('To Do'));
    projects[0].tasks.reverse().push(Task('Go for walk outside', 'Theres a whole world out there', 'To Do', getDateToday(), 0));
    projects[0].tasks.reverse().push(Task('Clean the kitchen', 'It should look nice', 'To Do', getTomorrow(), 0));
  projects.push(Project('My Project'));
    projects[1].tasks.reverse().push(Task('Finish project', 'Almost done...', 'My Project', getWeek(), 0));
  projects.push(Project('Groceries'));
    projects[2].tasks.reverse().push(Task('Buy some chicken', 'Pollo', 'Groceries', getDateToday(), 0));
    projects[2].tasks.reverse().push(Task('Buy some bananas', 'Chiquita', 'Groceries', getDateToday(), 0));
  projects.push(Project('Gym'));
    projects[3].tasks.reverse().push(Task('Leg Day', 'Deadlift, Back squat, Leg Extentions', 'Gym', getDateToday(), 0));
    projects[3].tasks.reverse().push(Task('Chest Day', 'Bench press, Incline', 'Gym', getTomorrow(), 0));
  projects.push(Project('School'));
    projects[4].tasks.reverse().push(Task('Finish class', 'You can do this!', 'School', getMonth(), 0));
}

function checkForDuplicate(input) {
  return projects.some(obj => obj.project === input);
}

function Project(input) {
  return {
    project: input,
    tasks: []
  }
}

// if (projects.length === 0) {
//   projects.push(Project('To Do'));
// }

export let project = 'To Do';

export function initializeProject() {
  project = 'To Do';
}

function getProjectByLi(e) {
  project = e.target.firstChild.lastChild.innerHTML;
  e.stopImmediatePropagation();
  populateProjectScreen();
}

function getProjectByWrapper(e) {
  project = e.target.lastChild.innerHTML;
  e.stopImmediatePropagation();
  populateProjectScreen();
}

function getProject(e) {
  project = e.target.innerHTML;
  e.stopImmediatePropagation();
  populateProjectScreen();
}

function getProjectFromIcon(e) {
  project = e.target.nextSibling.innerHTML;
  e.stopImmediatePropagation();
  populateProjectScreen();
}

export function populateProjects() {
  clearProjectsFromDOM();
  projects.forEach(projectObj => {
    const newList = document.createElement('ul');
    newList.classList.add('project-innner-list');
    list.appendChild(newList);
    const li = document.createElement('li');
    li.classList.add('sidebar-item');
    li.classList.add('project-li');
    newList.appendChild(li);
    li.addEventListener('click', getProjectByLi);
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
    li.appendChild(projectWrapper);
    projectWrapper.addEventListener('click', getProjectByWrapper);
    const icon = document.createElement('span');
    icon.innerHTML = '&#128211;'
    projectWrapper.appendChild(icon);
    icon.addEventListener('click', getProjectFromIcon);
    const projectName = document.createElement('span');
    projectName.classList.add('project-span');
    projectName.innerHTML = projectObj.project;
    projectWrapper.appendChild(projectName);
    projectName.addEventListener('click', getProject);
  });
}

populateProjects();

function addProject(e) {
  const input = document.querySelector('.project-input');
  if (input === document.activeElement && e.key === 'Enter') {
    if (checkForDuplicate(input.value) === false) {
      projects.push(Project(input.value));
      localStorage.setItem('projects', JSON.stringify(projects));
      removeWindowListener();
      populateProjects();
    }
  }
}

function addWindowListener() {
  window.addEventListener('keydown', addProject);
}

function removeWindowListener() {
  window.removeEventListener('keydown', addProject);
}

const smokeScreen = document.querySelector('.smoke-screen');

export function closeSidebar() {
  if (!sidebar.classList.contains('invisible')) {
    sidebar.classList.add('invisible');
    isOpen = false;
    tasks.classList.remove('stretch');
  }
}

export function toggleSidebarSmallScreen() {
  sidebar.classList.toggle('invisible');
  tasks.classList.remove('stretch');
  if (sidebar.classList.contains('invisible')) {
    isOpen = false;
  } else {
    isOpen = true;
  }
  toggleSmoke();
  closeInputByToggle();
  hideForm();
}

function openSidebar() {
  if (sidebar.classList.contains('invisible')) {
    sidebar.classList.remove('invisible');
    isOpen = true;
    tasks.classList.add('stretch');
  }
}

function toggleSmoke() {
  if (isOpen === false) {
    smokeScreen.style.display = 'none';
    smokeScreen.removeEventListener('click', toggleSidebarSmallScreen)
  } else {
    smokeScreen.style.display = 'block';
    smokeScreen.addEventListener('click', toggleSidebarSmallScreen)
  }
}


function resizeFn() {
  if (window.innerWidth <= 880) {
    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebarSmallScreen);
  }
  const isMobile = navigator.userAgentData.mobile;
  if (isMobile) {
    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebarSmallScreen);
    tasks.classList.remove('stretch');
    return;
  }
  if (window.innerWidth <= 880) {
    closeSidebar();
  } else if (window.innerWidth >= 880) {
    if (isOpen === true) {
      smokeScreen.style.display = 'none';
    } else {
      openSidebar();
    }
    hamburger.removeEventListener('click', toggleSidebarSmallScreen);
    hamburger.addEventListener('click', toggleSidebar);
  }
}

window.onload = resizeFn;
window.onresize = resizeFn;