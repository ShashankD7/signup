// Get references to the HTML elements
const signupForm = document.getElementById('signupForm');
const fullNameElement = document.getElementById('fullname');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('confirmPassword');
const fullNameSpan = document.getElementById('fullName');
const emailSpan = document.getElementById('email');
const passwordSpan = document.getElementById('password');
const profileInfo = document.getElementById('profileInfo');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Check if the user is already authenticated (access token exists)
const accessToken = localStorage.getItem('accessToken');
const isAuthenticated = accessToken !== null;

// Function to redirect to the signup page
function redirectToSignup() {
  window.location.href = 'index.html';
}

// Function to redirect to the profile page
function redirectToProfile() {
  window.location.href = 'profile.html';
}

// Function to handle logout
function logout() {
  // Clear all states and access token
  localStorage.removeItem('accessToken');
  localStorage.removeItem('fullName');
  localStorage.removeItem('email');
  localStorage.removeItem('password');

  // Redirect to signup page
  redirectToSignup();
}

// Function to handle form submission
function handleSignup(event) {
  event.preventDefault();

  // Get form values
  const fullName = fullNameElement.value;
  const email = emailElement.value;
  const password = passwordElement.value;
  const confirmPassword = confirmPasswordElement.value;

  // Validate form fields
  if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
    errorMessage.innerText = 'Error: All fields are mandatory';
    errorMessage.style.color = 'red'
    setTimeout (() => {
      errorMessage.innerText = '';
    }, 1500)
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.innerText = 'Passwords do not match';
    errorMessage.style.color = 'red'
    setTimeout (() => {
      errorMessage.innerText = '';
    }, 1500)
    return;
  }

  // Generate random access token
  const newAccessToken = generateAccessToken();

  // Save user state in local storage
  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  // Clear form fields
  fullNameElement.value = '';
  emailElement.value = '';
  passwordElement.value = '';
  confirmPasswordElement.value = '';

  // Show success message
  successMessage.innerText = 'Signup successful! Redirecting to profile...';
  successMessage.style.color = 'green'

  // Redirect to profile page
  setTimeout(redirectToProfile, 2000);
}

// Generate a random 16-byte access token
function generateAccessToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

// Check if the current page is the signup page
const isSignupPage = window.location.href.includes('index.html');

// Check if the current page is the profile page
const isProfilePage = window.location.href.includes('profile.html');

// Perform page-specific checks and redirects
if (isSignupPage) {
  if (isAuthenticated) {
    // User is already authenticated, redirect to profile page
    redirectToProfile();
  }
} else if (isProfilePage) {
  if (!isAuthenticated) {
    // User is not authenticated, redirect to signup page
    redirectToSignup();
  } else {
    // Display user's details on the profile page
    fullNameSpan.innerText = localStorage.getItem('fullName');
    emailSpan.innerText = localStorage.getItem('email');
    passwordSpan.innerText = localStorage.getItem('password');
    profileInfo.style.display = 'block';
  }
}

// Attach event listener to the signup form
signupForm.addEventListener('submit', handleSignup);
