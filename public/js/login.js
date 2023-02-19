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
      body: JSON.stringify({ "email": login_email, "password": login_password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const signup_email = document.querySelector('#email-signup').value.trim();
  const signup_password = document.querySelector('#password-signup').value.trim();
  const confirm_password = document.querySelector('#password-confirm').value.trim();
  const name = document.querySelector('#name').value;

  if (signup_email && signup_password && confirm_password && name) {
    if (confirm_password !== signup_password) {
      alert('Passwords do not match!');
    } else {
    // Send the e-mail and password to the server
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ "email": signup_email, name, "password": signup_password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/');
        location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);