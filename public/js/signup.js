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
        body: JSON.stringify({ email: signup_email, name, password: signup_password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        alert('Account Created!');
        document.location.replace('/login');
      } else {
        alert('Invalid email or password does not meet length reqirements (minimum 8 characters)');
      }
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);