import populateProjectScreen from "./projects";
import { hideForm, Task, getDateToday } from "./taskeditor";
import { getMonth, getTomorrow, getWeek } from "./upcoming";

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

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', toggleSidebar);

function toggleButton() {
  const arrow = document.querySelector('.projects-toggle');
  arrow.classList.toggle('toggle');
}

let open = 0;

function closeInputByToggle() {
  if (open === 0) return;
  open = 0;
  const li = document.querySelector('.project-list-item-input');
  li.remove();
}

function clearProjectsFromDOM() {
  const projectListItems = document.querySelectorAll('.project-li');
  projectListItems.forEach(item => {
    item.remove();
  });
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

const projectsToggle = document.querySelector('.projects-toggle-container');
projectsToggle.addEventListener('click', toggleButton);
projectsToggle.addEventListener('click', toggleProjectView);
const projectBar = document.querySelector('.project-click');
projectBar.addEventListener('click', toggleButton);
projectBar.addEventListener('click', toggleProjectView);


function closeInput(e) {
  open = 0;
  e.preventDefault();
  const li = e.target.parentNode.parentNode
  li.remove();
}

const list = document.querySelector('.projects-list');
function openInput() {
  hideForm();
  if (open !== 1) {
    if (view !== 1) {
      view = 1;
      toggleButton();
      populateProjects();
    }
    open = 1;

    const li = document.createElement('li');
    li.classList.add('project-list-item-input');
    list.insertBefore(li, list.firstChild);

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
}

const addProjectBtn = document.querySelector('.add-project-button-container');
addProjectBtn.addEventListener('click', openInput);

export let projects = [];
if (projects.length === 0 && localStorage.projects) {
  projects = JSON.parse(localStorage.projects);
} else {
  projects.push(Project('To Do'));
    projects[0].tasks.reverse().push(Task('Go for walk outside', 'Theres a whole world out there', 'To Do', getDateToday(), 0));
    projects[0].tasks.reverse().push(Task('Clean the kitchen', 'It should look nice', 'To Do', getTomorrow(), 0));
  projects.push(Project('My Project'));
    projects[1].tasks.reverse().push(Task('Finish project', 'Almost done...', 'My Project', getWeek(), 0));
  projects.push(Project('Groceries'));
    projects[2].tasks.reverse().push(Task('Buy some chicken', 'Pollo', 'Groceries', getDateToday(), 0));
    projects[2].tasks.reverse().push(Task('Buy some bananas', 'Chiquita', 'Groceries', getDateToday(), 0));
  projects.push(Project('Gym'));
    projects[3].tasks.reverse().push(Task('Leg Day', 'Deadlift, Back squat, Leg Extentions', 'Gym', getDateToday(), 0));
    projects[3].tasks.reverse().push(Task('Chest Day', 'Bench press, Incline', 'Gym', getTomorrow(), 0));
  projects.push(Project('School'));
    projects[4].tasks.reverse().push(Task('Finish class', 'You can do this!', 'School', getMonth(), 0));
}

function checkForDuplicate(input) {
  return projects.some(obj => obj.project === input);
}

function Project(input) {
  return {
    project: input,
    tasks: []
  }
}

// if (projects.length === 0) {
//   projects.push(Project('To Do'));
// }

export let project = 'To Do';

export function initializeProject() {
  project = 'To Do';
}

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

export function populateProjects() {
  clearProjectsFromDOM();
  projects.forEach(projectObj => {
    const newList = document.createElement('ul');
    newList.classList.add('project-innner-list');
    list.appendChild(newList);
    const li = document.createElement('li');
    li.classList.add('sidebar-item');
    li.classList.add('project-li');
    newList.appendChild(li);
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
    projectName.innerHTML = projectObj.project;
    projectWrapper.appendChild(projectName);
    projectName.addEventListener('click', getProject);
  });
}

populateProjects();

function addProject(e) {
  const input = document.querySelector('.project-input');
  if (input === document.activeElement && e.key === 'Enter') {
    if (checkForDuplicate(input.value) === false) {
      projects.push(Project(input.value));
      localStorage.setItem('projects', JSON.stringify(projects));
      removeWindowListener();
      populateProjects();
    }
  }
}

function addWindowListener() {
  window.addEventListener('keydown', addProject);
}

function removeWindowListener() {
  window.removeEventListener('keydown', addProject);
}

const smokeScreen = document.querySelector('.smoke-screen');

export function closeSidebar() {
  if (!sidebar.classList.contains('invisible')) {
    sidebar.classList.add('invisible');
    isOpen = false;
    tasks.classList.remove('stretch');
  }
}

export function toggleSidebarSmallScreen() {
  sidebar.classList.toggle('invisible');
  tasks.classList.remove('stretch');
  if (sidebar.classList.contains('invisible')) {
    isOpen = false;
    document.body.style.overflow = 'auto';
  } else {
    isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  toggleSmoke();
  closeInputByToggle();
  hideForm();
}

function openSidebar() {
  if (sidebar.classList.contains('invisible')) {
    sidebar.classList.remove('invisible');
    isOpen = true;
    tasks.classList.add('stretch');
  }
}

function toggleSmoke() {
  if (isOpen === false) {
    smokeScreen.style.display = 'none';
    smokeScreen.removeEventListener('click', toggleSidebarSmallScreen)
  } else {
    smokeScreen.style.display = 'block';
    smokeScreen.addEventListener('click', toggleSidebarSmallScreen)
  }
}


function resizeFn() {
  if (window.innerWidth <= 880) {
    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebarSmallScreen);
  }
  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  if (window.mobileCheck()) {
    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebarSmallScreen);
    tasks.classList.remove('stretch');
    return;
  }
  if (window.innerWidth <= 880) {
    closeSidebar();
  } else if (window.innerWidth >= 880) {
    if (isOpen === true) {
      smokeScreen.style.display = 'none';
    } else {
      openSidebar();
    }
    hamburger.removeEventListener('click', toggleSidebarSmallScreen);
    hamburger.addEventListener('click', toggleSidebar);
  }
}

window.onload = resizeFn;
window.onresize = resizeFn;