const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', toggleSidebar);

const sidebar = document.querySelector('.sidebar');
const tasks = document.querySelector('.tasks');

export default function toggleSidebar() {
  sidebar.classList.toggle('invisible');
  tasks.classList.toggle('stretch');
}

const projectsToggle = document.querySelector('.projects-toggle');
projectsToggle.addEventListener('click', toggleButton);

function toggleButton() {
  projectsToggle.classList.toggle('toggle');
}

const addProjectBtn = document.querySelector('.add-project');
addProjectBtn.addEventListener('click', addProject);

function addProject() {
  const container = document.querySelector('.project-container');
  const form = document.createElement('form');
  form.classList.add('project-form');
  container.appendChild(form);
  
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'New Project');
  form.appendChild(input);
}