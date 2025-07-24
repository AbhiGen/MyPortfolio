document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const socialsContainer = document.getElementById('socials-container');

  // Save original icons for restoring in light mode
  const originalIcons = {
    linkedin: {
      src: 'assests/linkedin.png',
      alt: 'LinkedIn profile',
      url: 'https://www.linkedin.com/in/abhiram-bikkina-96a342282',
    },
    github: {
      src: 'assests/github.png',
      alt: 'Github profile',
      url: 'https://github.com/AbhiGen',
    },
  };

  function switchToButtons() {
    socialsContainer.innerHTML = '';

    const linkedinBtn = document.createElement('button');
    linkedinBtn.textContent = 'LinkedIn';
    linkedinBtn.className = 'btn btn-color-2';
    linkedinBtn.onclick = () => window.open(originalIcons.linkedin.url, '_blank');

    const githubBtn = document.createElement('button');
    githubBtn.textContent = 'GitHub';
    githubBtn.className = 'btn btn-color-2';
    githubBtn.onclick = () => window.open(originalIcons.github.url, '_blank');

    socialsContainer.appendChild(linkedinBtn);
    socialsContainer.appendChild(githubBtn);
  }

  function switchToIcons() {
    socialsContainer.innerHTML = '';

    const linkedinImg = document.createElement('img');
    linkedinImg.src = originalIcons.linkedin.src;
    linkedinImg.alt = originalIcons.linkedin.alt;
    linkedinImg.className = 'icon';
    linkedinImg.onclick = () => window.open(originalIcons.linkedin.url, '_blank');

    const githubImg = document.createElement('img');
    githubImg.src = originalIcons.github.src;
    githubImg.alt = originalIcons.github.alt;
    githubImg.className = 'icon';
    githubImg.onclick = () => window.open(originalIcons.github.url, '_blank');

    socialsContainer.appendChild(linkedinImg);
    socialsContainer.appendChild(githubImg);
  }

  function updateTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.src = 'assests/sun.png'; // icon when in dark mode
      switchToButtons();
    } else {
      body.classList.remove('dark-theme');
      themeToggle.src = 'assests/moon.png'; // icon when in light mode
      switchToIcons();
    }
    localStorage.setItem('theme', theme);
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  updateTheme(savedTheme);

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    updateTheme(newTheme);
  });
});
