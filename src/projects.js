import { project, isOpen, toggleSidebarSmallScreen } from "./sidebar";
import { checkForForm, hideToday, populateTasks, hideUpcoming, showProject } from "./today";

const deleteProject = document.querySelector('.delete-project');
deleteProject.addEventListener('click', openDeleteModal);

function showDeleteProject() {
  deleteProject.style.display = 'block';
}

export function hideDeleteProject() {
  deleteProject.style.display = 'none';
}

export default function populateProjectScreen() {
  populateHeading();
  updateTitle();
  showDeleteProject();
  hideToday();
  hideUpcoming();
  showProject();
  checkForForm();
  populateTasks();
  if (window.innerWidth <= 880) {
    toggleSidebarSmallScreen();
  }
}

function populateHeading() {
  const heading = document.querySelector('.agenda-heading');
  heading.innerHTML = project;
  const d = document.querySelector('.header-date');
  d.innerHTML = '';
}

function updateTitle() {
  document.title = `To Do: ${project}`;
}

function openDeleteModal() {
  const container = document.querySelector('.modal-container');
  container.style.display = 'block';
  const modal = document.createElement('div');
  modal.classList.add('delete-modal');
  if (isOpen === true) {
    modal.classList.add('modal-stretch');
  } else {
    modal.classList.add('modal-unstretch');
  }
  container.appendChild(modal);
  const question = document.createElement('div');
  question.classList.add('question');
  question.innerHTML = 'Delete project?';
  modal.appendChild(question);
  const info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = 'All project tasks will be deleted as well';
  modal.appendChild(info);
  const buttonWrap = document.createElement('div');
  buttonWrap.classList.add('delete-buttons');
  modal.appendChild(buttonWrap);
  const cancel = document.createElement('button');
  cancel.classList.add('delete-cancel');
  cancel.classList.add('delete-btn');
  cancel.innerHTML = 'Cancel';
  buttonWrap.appendChild(cancel);
  cancel.addEventListener('click', closeModal);
  const confirm = document.createElement('button');
  confirm.classList.add('delete-confirm');
  confirm.classList.add('delete-btn');
  confirm.innerHTML = 'Delete';
  buttonWrap.appendChild(confirm);
  container.addEventListener('click', closeModalByClick);
}

function closeModal() {
  const modal = document.querySelector('.delete-modal');
  const container = document.querySelector('.modal-container');
  modal.remove();
  container.style.display = 'none';
  container.removeEventListener('click', closeModalByClick);
}

function closeModalByClick(e) {
  const container = document.querySelector('.modal-container');
  if (e.target === container) {
    closeModal();
  }
}