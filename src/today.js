const todaySidebar = document.querySelector('.today');
todaySidebar.addEventListener('click', populateToday);

export default function populateToday() {
  populateHeading();
  populateDate();
}

function populateHeading() {
  const heading = document.querySelector('.agenda-heading');
  heading.innerHTML = 'Today';
}

function populateDate() {
  const d = document.querySelector('.header-date');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = new Date().getDay();
  const date = new Date().getDate();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = new Date().getMonth();
  d.innerHTML = `${days[day]} ${months[month]} ${date}`;
}

// const content = document.querySelector('.agenda-content');
// const contentTop = document.createElement('div');
// content.appendChild(contentTop);
// const contentBottom = document.createElement('div');
// content.appendChild(contentBottom);
// // Overdue
// const overdue = document.createElement('h2');
// overdue.innerHTML = 'Overdue';
// overdue.classList.add('h2');
// contentTop.appendChild(overdue);

// const line = document.createElement('hr');
// line.classList.add('line');
// contentTop.appendChild(line);

// // Today
// const today = document.createElement('h2');
// today.innerHTML = 'Today';
// today.classList.add('h2');
// contentBottom.appendChild(today);