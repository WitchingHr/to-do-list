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