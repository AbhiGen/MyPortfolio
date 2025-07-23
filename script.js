// Toggle hamburger menu for mobile navigation
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.src = 'assests/theme.png'; // Replace with your dark mode icon path
  } else {
    themeToggle.src = 'assests/theme.png'; // Replace with your light mode icon path
  }

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.src = isDark ? 'assests/dark-mode.png' : 'assests/theme.png'; // Update icon based on theme
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      formStatus.innerHTML = '<span class="loading-dots">Sending<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span></span>';
      formStatus.style.color = '#555';

      // In a real application, you would send this data to a backend server.
      // For demonstration, we'll simulate a delay.
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      console.log("Form Data:", data);

      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

        // Simulate success
        formStatus.textContent = 'Message sent successfully! 🎉';
        formStatus.style.color = '#00BFA6'; // Success color
        contactForm.reset(); // Clear the form

      } catch (error) {
        // Simulate failure
        formStatus.textContent = 'Failed to send message. Please try again later. 😟';
        formStatus.style.color = '#dc3545'; // Error color
        console.error("Form submission error:", error);
      }
    });
  }
});