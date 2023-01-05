import { checkForForm } from "./today";

const upcomingSidebar = document.querySelector('.upcoming');
upcomingSidebar.addEventListener('click', populateUpcoming);

export default function populateUpcoming() {
  populateHeading();
  updateTitle();
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