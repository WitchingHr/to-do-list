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
  const list = document.querySelector('.projects-list');
  const li = document.createElement('li');
  list.appendChild(li);

  const form = document.createElement('form');
  form.classList.add('project-form');
  li.appendChild(form);
  
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'New Project');
  input.setAttribute('type', 'text');
  input.classList.add('project-input');
  form.appendChild(input);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.classList.add('close-button');
  form.appendChild(closeBtn);
}