document.addEventListener('DOMContentLoaded', function () {
  const navigationLinks = document.querySelectorAll('.navigation-link');
  const navigationMenus = document.querySelectorAll('.navigation-menu');
  const burgerMenu = document.querySelector('.burger-menu');
  const sendButton = document.querySelector('.form-button button');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const dateInput = document.querySelector('input[type="date"]');
  const messageInput = document.getElementById('message');
  const businessTypeSelect = document.getElementById('businessType');
  const toggles = document.querySelectorAll('.footer-dropdown-toggle');

  // Toggle navigation menu visibility
  function toggleMenu() {
    navigationMenus.forEach((menu) => menu.classList.toggle('active'));
  }

  // Attach event listener to burger menu
  burgerMenu.addEventListener('click', toggleMenu);

  // Navigation link behavior
  navigationLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 81,
          behavior: 'smooth',
        });
      }

      navigationMenus.forEach((menu) => menu.classList.remove('active'));
    });
  });

  // Validate fields and update button state
  function updateButtonState() {
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      emailInput.classList.contains('error') ||
      messageInput.value.trim().length < 3 ||
      dateInput.value === '' ||
      dateInput.classList.contains('error')
    ) {
      sendButton.classList.remove('primary');
      sendButton.classList.add('disabled');
    } else {
      sendButton.classList.remove('disabled');
      sendButton.classList.add('primary');
    }
  }

  // Initialize button state on page load
  updateButtonState();

  // Event listeners for real-time validation and button state updates
  [nameInput, emailInput, messageInput, dateInput].forEach((input) => {
    input.addEventListener('input', () => {
      validateField(input);
      updateButtonState();
    });
  });

  // Validate individual field
  function validateField(field) {
    if (!field.value.trim()) {
      displayError(field, 'This field is required');
      return false;
    } else if (field === messageInput && field.value.trim().length < 3) {
      displayError(field, 'Message must be at least 3 characters long');
      return false;
    } else if (field === emailInput && !isValidEmail(emailInput.value)) {
      displayError(field, 'Enter a valid email');
      return false;
    } else if (field === dateInput && new Date(dateInput.value) < new Date()) {
      displayError(field, 'Please select a future date');
      return false;
    } else {
      clearError(field);
      return true;
    }
  }

  // Display error message
  function displayError(input, message) {
    const errorDisplay = input.nextElementSibling;
    errorDisplay.textContent = message;
    errorDisplay.style.visibility = 'visible';
    input.classList.add('error');
  }

  // Clear error message
  function clearError(input) {
    const errorDisplay = input.nextElementSibling;
    errorDisplay.textContent = '';
    errorDisplay.style.visibility = 'hidden';
    input.classList.remove('error');
  }

  // Check valid email format
  function isValidEmail(email) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(String(email).toLowerCase());
  }

  // Form submission validation
  sendButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (validateForm()) {
      alert('🎉 Form is valid and has been reset. 🎉');
      updateButtonState();
    }
  });

  // Validate the entire form
  function validateForm() {
    let isFormValid = true;
    [nameInput, emailInput, dateInput, messageInput].forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      [nameInput, emailInput, dateInput, messageInput].forEach(
        (field) => (field.value = '')
      );
      businessTypeSelect.value = businessTypeSelect.options[0].value;
      sendButton.classList.add('disabled');
    }

    return isFormValid;
  }

  toggles.forEach((toggle) => {
    const content = toggle.nextElementSibling;

    content.style.display = 'none';
    toggle.classList.remove('active');

    toggle.addEventListener('click', function () {
      if (content.style.display === 'none') {
        content.style.display = 'flex';
        this.classList.add('active');
      } else {
        content.style.display = 'none';
        this.classList.remove('active');
      }
    });
  });
});
