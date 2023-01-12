import { checkForForm, hideToday, populateTasks, hideProject } from "./today";
import { hideDeleteProject } from "./projects";
import { toggleSidebarSmallScreen } from "./sidebar";

const upcomingSidebar = document.querySelector('.upcoming');
upcomingSidebar.addEventListener('click', populateUpcoming);

export default function populateUpcoming() {
  populateHeading();
  updateTitle();
  hideDeleteProject();
  hideToday();
  hideProject();
  checkForForm();
  populateTasks();
  if (window.innerWidth <= 880) {
    toggleSidebarSmallScreen();
  }
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

export function getTomorrow() {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset);
  date.setDate(date.getDate() + 1);
  const tomorrow = date.toISOString().split('T')[0];
  return tomorrow;
}

export function getWeek() {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset);
  date.setDate(date.getDate() + 7);
  const week = date.toISOString().split('T')[0];
  return week;
}

export function getMonth() {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset);
  date.setDate(date.getDate() + 30);
  const month = date.toISOString().split('T')[0];
  return month;
}