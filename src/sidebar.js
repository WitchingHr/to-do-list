import populateProjectScreen from "./projects";

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', toggleSidebar);

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

const projectsToggle = document.querySelector('.projects-toggle-container');
projectsToggle.addEventListener('click', toggleButton);
projectsToggle.addEventListener('click', toggleProjectView);
const projectBar = document.querySelector('.project-click');
projectBar.addEventListener('click', toggleButton);
projectBar.addEventListener('click', toggleProjectView);


function toggleButton() {
  const arrow = document.querySelector('.projects-toggle');
  arrow.classList.toggle('toggle');
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

const addProjectBtn = document.querySelector('.add-project-button-container');
addProjectBtn.addEventListener('click', openInput);

let open = 0;
const list = document.querySelector('.projects-list');

function openInput() {
  if (open != 1) {
    if (view != 1) {
      view = 1;
      toggleButton();
      populateProjects();
    }
    open = 1;

    const li = document.createElement('li');
    li.classList.add('project-list-item-input');
    list.appendChild(li);

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
  }
  return;
}

function closeInput(e) {
  open = 0;
  e.preventDefault();
  const li = e.target.parentNode.parentNode
  li.remove();
}

function closeInputByToggle() {
  if (open === 0) return;
  open = 0;
  const li = document.querySelector('.project-list-item-input');
  li.remove();
}

export let projects = [];
if (localStorage.projects) {
  projects = JSON.parse(localStorage.projects);
}

function addProject(e) {
  const input = document.querySelector('.project-input');

  if (input === document.activeElement && e.key === 'Enter') {
    projects.push(Project(input.value));
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(JSON.parse(localStorage.projects));
    removeWindowListener();
    populateProjects();
  }
}

function Project(input) {
  return {
    project: input,
    tasks: []
  }
}

if (projects.length === 0) {
  projects.push(Project('To Do'));
}

populateProjects();

function addWindowListener() {
  window.addEventListener('keydown', addProject);
}

function removeWindowListener() {
  window.removeEventListener('keydown', addProject);
}

function populateProjects() {
  clearProjectsFromDOM();
  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('sidebar-item');
    li.classList.add('project-li');
    list.appendChild(li);
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
    projectName.innerHTML = project.project;
    projectWrapper.appendChild(projectName);
    projectName.addEventListener('click', getProject);
  });
}

function clearProjectsFromDOM() {
  const projectListItems = document.querySelectorAll('.project-li');
  projectListItems.forEach(item => {
    item.remove();
  });
}

export let project = 'To Do';
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

function resizeFn() {
  if (window.innerWidth <= 880) {
    closeSidebar();
    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebarSmallScreen);
  } else if (window.innerWidth >= 880) {
    openSidebar();
    hamburger.removeEventListener('click', toggleSidebarSmallScreen);
    hamburger.addEventListener('click', toggleSidebar);
  }

}

function closeSidebar() {
  if (!sidebar.classList.contains('invisible')) {
    sidebar.classList.add('invisible');
    isOpen = false;
    tasks.classList.remove('stretch');
  }
}

function openSidebar() {
  if (sidebar.classList.contains('invisible')) {
    sidebar.classList.remove('invisible');
    isOpen = true;
    tasks.classList.add('stretch');
  }
}

window.onresize = resizeFn;

const smokeScreen = document.querySelector('.smoke-screen');

export function toggleSidebarSmallScreen() {
  sidebar.classList.toggle('invisible');
  if (sidebar.classList.contains('invisible')) {
    isOpen = false;
  } else {
    isOpen = true;
  }
  if (smokeScreen.style.display === 'none') {
    smokeScreen.style.display = 'block';
  } else {
    smokeScreen.style.display = 'none';
  }
}