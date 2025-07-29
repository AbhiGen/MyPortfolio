document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const socialsContainer = document.getElementById('socials-container');

  const originalIcons = {
    linkedin: 'assests/linkedin.png',
    github: 'assests/github.png',
  };

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.src = 'assests/sun.png';
      socialsContainer.innerHTML = `
        <button class="btn btn-color-2" onclick="window.open('https://www.linkedin.com/in/abhiram-bikkina-96a342282', '_blank')">LinkedIn</button>
        <button class="btn btn-color-2" onclick="window.open('https://github.com/AbhiGen', '_blank')">GitHub</button>
      `;
    } else {
      body.classList.remove('dark-theme');
      themeToggle.src = 'assests/moon.png';
      socialsContainer.innerHTML = `
        <img src="${originalIcons.linkedin}" alt="LinkedIn profile" class="icon" onclick="window.open('https://www.linkedin.com/in/abhiram-bikkina-96a342282', '_blank')" />
        <img src="${originalIcons.github}" alt="Github profile" class="icon" onclick="window.open('https://github.com/AbhiGen', '_blank')" />
      `;
    }
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);

  // Apply saved theme on initial load
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});

function showSkill(id, button) {
  // Hide all cards
  const cards = document.querySelectorAll('.experience-card');
  cards.forEach(card => card.classList.remove('active'));

  // Show the selected one
  document.getElementById(id).classList.add('active');

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.skill-tab');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add active to current button
  button.classList.add('active');
}

function showSkill(skillId) {
  // Hide all skill sections
  const allCards = document.querySelectorAll('.experience-card');
  allCards.forEach(card => card.classList.add('hidden'));

  // Show selected skill section
  document.getElementById(skillId).classList.remove('hidden');

  // Update active tab
  const tabs = document.querySelectorAll('.skill-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[onclick="showSkill('${skillId}')"]`).classList.add('active');
}

// Back to top button
const backToTopBtn = document.getElementById('back-to-top-btn');

window.onscroll = function() {
  scrollFunction();
  scrollSpy();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

function closeMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.remove('open');
  icon.classList.remove('open');
}

// Scrollspy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function scrollSpy() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current)) {
      a.classList.add('active');
    }
  });
}

// Education Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.5
});

timelineItems.forEach(item => {
  observer.observe(item);
});
