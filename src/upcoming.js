import { checkForForm } from "./today";

const upcomingSidebar = document.querySelector('.upcoming');
upcomingSidebar.addEventListener('click', populateUpcoming);
upcomingSidebar.addEventListener('click', hideToday);

export default function populateUpcoming() {
  populateHeading();
  updateTitle();
  hideToday();
  showUpcoming();
  checkForForm();
}

function populateHeading() {
  const heading = document.querySelector('.agenda-heading');
  heading.innerHTML = 'Upcoming';

  const d = document.querySelector('.header-date');
  d.innerHTML = '';
}

function updateTitle() {
  document.title = 'To Do: Upcoming';
}

const agendaList = document.querySelector('.agenda-list');
const addTaskButton = document.querySelector('.button-node');
const todayContainer = document.querySelector('.today-container');
const overdueContainer = document.querySelector('.overdue-container');
const weekContainer = document.querySelector('.week-container');
const monthContainer = document.querySelector('.month-container');

function showUpcoming() {
  // check for week, month
  weekContainer.style.display = 'block';
  monthContainer.style.display = 'block';
}

function hideToday() {
  todayContainer.style.display = 'none';
  overdueContainer.style.display = 'none';
}