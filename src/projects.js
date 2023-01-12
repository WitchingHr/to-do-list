import { project, isOpen, toggleSidebarSmallScreen, projects, populateProjects, initializeProject } from "./sidebar";
import { checkForForm, hideToday, populateTasks, hideUpcoming, showProject } from "./today";
import populateToday from "./today";

const heading = document.querySelector('.agenda-heading');

const deleteProjectButton = document.querySelector('.delete-project');
deleteProjectButton.addEventListener('click', openDeleteModal);

function showDeleteProject() {
  if (heading.innerHTML != 'To Do') {
    deleteProjectButton.style.display = 'block';
  }
}

export function hideDeleteProject() {
  deleteProjectButton.style.display = 'none';
}

export default function populateProjectScreen() {
  populateHeading();
  updateTitle();
  hideDeleteProject();
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
  heading.innerHTML = project;
  const d = document.querySelector('.header-date');
  d.innerHTML = '';
}

function updateTitle() {
  document.title = `To Do: ${project}`;
}

const smokeScreen = document.querySelector('.smoke-screen');

function openDeleteModal() {
  smokeScreen.style.display = 'block';
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
  confirm.addEventListener('click', deleteProject);
  container.addEventListener('click', closeModalByClick);
}

function closeModal() {
  const modal = document.querySelector('.delete-modal');
  const container = document.querySelector('.modal-container');
  modal.remove();
  container.style.display = 'none';
  smokeScreen.style.display = 'none';
  container.removeEventListener('click', closeModalByClick);
}

function closeModalByClick(e) {
  const container = document.querySelector('.modal-container');
  if (e.target === container) {
    closeModal();
  }
}

function deleteProject() {
  const index = projects.findIndex(obj => obj.project === project);
  projects.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  closeModal();
  initializeProject();
  populateToday();
  populateProjects();
  populateTasks();
}