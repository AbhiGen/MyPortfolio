document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.src = 'assests/sun.png';
    } else {
      body.classList.remove('dark-theme');
      themeToggle.src = 'assests/moon.png';
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
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
}

backToTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

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
