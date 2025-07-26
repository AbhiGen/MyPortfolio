// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeFormValidation();
  initializeSmoothScrolling();
  initializeAnimations();
});

// Theme Management
function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const socialsContainer = document.getElementById('socials-container');
  
  // Original social links data
  const originalIcons = {
    linkedin: {
      src: 'assests/linkedin.png',
      alt: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abhiram-bikkina-96a342282',
    },
    github: {
      src: 'assests/github.png',
      alt: 'GitHub',
      url: 'https://github.com/AbhiGen',
    },
  };

  function switchToButtons() {
    socialsContainer.innerHTML = '';

    const linkedinBtn = document.createElement('button');
    linkedinBtn.textContent = 'LinkedIn';
    linkedinBtn.className = 'btn btn-color-2 social-btn';
    linkedinBtn.onclick = () => window.open(originalIcons.linkedin.url, '_blank');
    linkedinBtn.setAttribute('aria-label', 'Visit LinkedIn profile');

    const githubBtn = document.createElement('button');
    githubBtn.textContent = 'GitHub';
    githubBtn.className = 'btn btn-color-2 social-btn';
    githubBtn.onclick = () => window.open(originalIcons.github.url, '_blank');
    githubBtn.setAttribute('aria-label', 'Visit GitHub profile');

    socialsContainer.appendChild(linkedinBtn);
    socialsContainer.appendChild(githubBtn);
  }

  function switchToIcons() {
    socialsContainer.innerHTML = '';

    const linkedinLink = document.createElement('a');
    linkedinLink.href = originalIcons.linkedin.url;
    linkedinLink.target = '_blank';
    linkedinLink.rel = 'noopener noreferrer';
    linkedinLink.className = 'social-link';
    linkedinLink.setAttribute('aria-label', 'LinkedIn profile');

    const linkedinImg = document.createElement('img');
    linkedinImg.src = originalIcons.linkedin.src;
    linkedinImg.alt = originalIcons.linkedin.alt;
    linkedinImg.className = 'icon';
    linkedinLink.appendChild(linkedinImg);

    const githubLink = document.createElement('a');
    githubLink.href = originalIcons.github.url;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'social-link';
    githubLink.setAttribute('aria-label', 'GitHub profile');

    const githubImg = document.createElement('img');
    githubImg.src = originalIcons.github.src;
    githubImg.alt = originalIcons.github.alt;
    githubImg.className = 'icon';
    githubLink.appendChild(githubImg);

    socialsContainer.appendChild(linkedinLink);
    socialsContainer.appendChild(githubLink);
  }

  function updateTheme(theme) {
    const themeImg = themeToggle.querySelector('img');
    
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeImg.src = 'assests/sun.png';
      themeImg.alt = 'Switch to light mode';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
      switchToButtons();
    } else {
      body.classList.remove('dark-theme');
      themeImg.src = 'assests/moon.png';
      themeImg.alt = 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      switchToIcons();
    }
    localStorage.setItem('theme', theme);
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  updateTheme(savedTheme);

  // Theme toggle event listener
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    updateTheme(newTheme);
  });
}

// Mobile Menu Functionality
function toggleMenu() {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const menuLinks = document.querySelector('.menu-links');
  
  hamburgerIcon.classList.toggle('open');
  menuLinks.classList.toggle('open');
  
  // Update aria-expanded attribute
  const isOpen = menuLinks.classList.contains('open');
  hamburgerIcon.setAttribute('aria-expanded', isOpen);
}

// Skills Tab Management
function showSkill(skillId) {
  // Hide all skill sections
  const allCards = document.querySelectorAll('.experience-card');
  allCards.forEach(card => card.classList.add('hidden'));

  // Show selected skill section
  const selectedCard = document.getElementById(skillId);
  if (selectedCard) {
    selectedCard.classList.remove('hidden');
  }

  // Update active tab and aria attributes
  const tabs = document.querySelectorAll('.skill-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  
  const activeTab = document.querySelector(`[onclick="showSkill('${skillId}')"]`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }
}

// Form Validation and Submission
function initializeFormValidation() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });

  // Form submission
  form.addEventListener('submit', handleFormSubmit);

  function validateField(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearError(field);

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      errorMessage = `${field.labels[0].textContent.replace('*', '').trim()} is required`;
      isValid = false;
    }
    // Email validation
    else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }
    // Message length validation
    else if (field.name === 'message' && field.value.trim() && field.value.trim().length < 10) {
      errorMessage = 'Message must be at least 10 characters long';
      isValid = false;
    }

    if (!isValid) {
      showError(field, errorMessage);
    }

    return isValid;
  }

  function showError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      formStatus.textContent = 'Please fix the errors above';
      formStatus.className = 'form-status error';
      return;
    }

    // Simulate form submission (replace with actual submission logic)
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.className = 'form-status success';
      form.reset();
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Clear form status after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }, 2000);
  }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menuLinks = document.querySelector('.menu-links');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        if (menuLinks && menuLinks.classList.contains('open')) {
          toggleMenu();
        }
      }
    });
  });
}

// Initialize Animations and Intersection Observer
function initializeAnimations() {
  // Fade in animation for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (menuLinks && menuLinks.classList.contains('open')) {
      menuLinks.classList.remove('open');
      hamburgerIcon.classList.remove('open');
      hamburgerIcon.setAttribute('aria-expanded', 'false');
    }
  }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (menuLinks && menuLinks.classList.contains('open')) {
      toggleMenu();
      hamburgerIcon.focus();
    }
  }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);
