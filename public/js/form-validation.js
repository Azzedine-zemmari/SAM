document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('a-form');
    const loginForm = document.getElementById('b-form');
  
    if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const tel = document.getElementById('tel').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('error-message');
  
        errorMessage.textContent = '';
  
        if (!name || !tel || !email || !password) {
          errorMessage.textContent = 'All fields are required.';
          event.preventDefault();
        } else if (!validateEmail(email)) {
          errorMessage.textContent = 'Please enter a valid email address.';
          event.preventDefault();
        } else if (password.length < 6) {
          errorMessage.textContent = 'Password must be at least 6 characters long.';
          event.preventDefault();
        }
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const loginErrorMessage = document.getElementById('login-error-message');
  
        loginErrorMessage.textContent = '';
  
        if (!email || !password) {
          loginErrorMessage.textContent = 'Both fields are required.';
          event.preventDefault();
        } else if (!validateEmail(email)) {
          loginErrorMessage.textContent = 'Please enter a valid email address.';
          event.preventDefault();
        }
      });
    }
  
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  });
  