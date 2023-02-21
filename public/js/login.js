const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const login_email = document.querySelector('#email-login').value.trim();
  const login_password = document.querySelector('#password-login').value.trim();

  if (login_email && login_password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: login_email, password: login_password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.replace('/');
      location.reload();
    } else {
      alert('Invalid Login');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);