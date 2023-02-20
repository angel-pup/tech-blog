const signupRedirect = () => {
    document.location.replace('/signup');
}

const loginRedirect = () => {
    document.location.replace('/login');
}

document.querySelector('#signup').addEventListener('click', signupRedirect);
document.querySelector('#login').addEventListener('click', loginRedirect);