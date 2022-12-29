import css from './styles/index.css';

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', toggleSidebar);

const sidebar = document.querySelector('.sidebar');
const tasks = document.querySelector('.tasks');

function toggleSidebar() {
  sidebar.classList.toggle('invisible');
  tasks.classList.toggle('stretch');
}
