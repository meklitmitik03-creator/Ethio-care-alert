const AUTH_API_URL = '/api/auth';

// Multi-language Translation Dictionary
const translations = {
  eng: {
    titleLogin: "Welcome Back",
    titleSignup: "Create Account",
    email: "Email",
    password: "Password",
    name: "Full Name",
    age: "Age",
    category: "I am a:",
    loginBtn: "Log In",
    signupBtn: "Create Account",
    noAcc: "New here?",
    hasAcc: "Already have an account?",
    createAccLink: "Create an account",
    loginLink: "Log In",
    langLabel: "Language",
    themeLabel: "Theme"
  },
  amh: {
    titleLogin: "እንኳን ደህና መጡ",
    titleSignup: "መለያ ይፍጠሩ",
    email: "ኢሜይል",
    password: "የይለፍ ቃል",
    name: "ሙሉ ስም",
    age: "እድሜ",
    category: "እኔ፡",
    loginBtn: "ግቡ",
    signupBtn: "መለያ ይፍጠሩ",
    noAcc: "አዲስ ነዎት?",
    hasAcc: "አካውንት አለዎት?",
    createAccLink: "መለያ ይፍጠሩ",
    loginLink: "ግቡ",
    langLabel: "ቋንቋ",
    themeLabel: "ጭብጥ"
  },
  afan: {
    titleLogin: "Baga Nagaan Dhuftan",
    titleSignup: "Akaawunti Uumaa",
    email: "Imeelii",
    password: "Jecha Darbiiti",
    name: "Maqaa Guutuu",
    age: "Umrii",
    category: "Akaakuu:",
    loginBtn: "Seenaa",
    signupBtn: "Akaawunti Uumaa",
    noAcc: "Haaraadhaa?",
    hasAcc: "Akaawunti qabduu?",
    createAccLink: "Akaawunti Uumaa",
    loginLink: "Seenaa",
    langLabel: "Afaan",
    themeLabel: "Haala Display"
  },
  tig: {
    titleLogin: "እንቋዕ ብደሓን መጻእኩም",
    titleSignup: "ሕሳብ ፍጠሩ",
    email: "ኢሜይል",
    password: "ሕልፊ ቓል",
    name: "ሙሉእ ስም",
    age: "ዕድመ",
    category: "ኣነ፡",
    loginBtn: "እተው",
    signupBtn: "ሕሳብ ፍጠሩ",
    noAcc: "ሓደሽዶ እዮም?",
    hasAcc: "ሕሳብ አለኩምዶ?",
    createAccLink: "ሕሳብ ፍጠሩ",
    loginLink: "እተው",
    langLabel: "ቋንቋ",
    themeLabel: "ቴማ"
  }
};

// DOM References
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const languageSelect = document.getElementById('languageSelect');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignupLink');
const showLoginLink = document.getElementById('showLoginLink');
const formTitle = document.getElementById('formTitle');

// Settings Modal Toggle
settingsBtn.addEventListener('click', () => settingsModal.classList.toggle('hidden'));

// Theme Switcher Logic
themeToggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.replace('light-theme', 'dark-theme');
    themeToggleBtn.textContent = "Switch to Light Mode";
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    themeToggleBtn.textContent = "Switch to Dark Mode";
  }
});

// Dynamic Language Switcher
languageSelect.addEventListener('change', (e) => {
  const dict = translations[e.target.value];

  document.getElementById('emailLabelLogin').innerText = dict.email;
  document.getElementById('passwordLabelLogin').innerText = dict.password;
  document.getElementById('emailLabelSignup').innerText = dict.email;
  document.getElementById('passwordLabelSignup').innerText = dict.password;
  document.getElementById('nameLabel').innerText = dict.name;
  document.getElementById('ageLabel').innerText = dict.age;
  document.getElementById('categoryLabel').innerText = dict.category;
  
  document.getElementById('loginBtn').innerText = dict.loginBtn;
  document.getElementById('signupBtn').innerText = dict.signupBtn;
  
  document.getElementById('noAccountText').innerText = dict.noAcc;
  document.getElementById('hasAccountText').innerText = dict.hasAcc;
  document.getElementById('showSignupLink').innerText = dict.createAccLink;
  document.getElementById('showLoginLink').innerText = dict.loginLink;

  document.getElementById('langLabel').innerHTML = `<i class="fa-solid fa-language"></i> ${dict.langLabel}`;
  document.getElementById('themeLabel').innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i> ${dict.themeLabel}`;

  const isSignup = !signupForm.classList.contains('hidden');
  formTitle.innerText = isSignup ? dict.titleSignup : dict.titleLogin;
});

// View Toggle Handlers
showSignupLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  formTitle.innerText = translations[languageSelect.value].titleSignup;
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  formTitle.innerText = translations[languageSelect.value].titleLogin;
});

// Registration Endpoint Fetch Call
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userData = {
    fullName: document.getElementById('signupName').value,
    age: Number(document.getElementById('signupAge').value),
    category: document.getElementById('signupCategory').value,
    email: document.getElementById('signupEmail').value,
    password: document.getElementById('signupPassword').value
  };

  try {
    const res = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const result = await res.json();
    if (!res.ok) return alert(result.error || 'Registration failed');

    alert('Account created and saved to MongoDB Atlas!');
    localStorage.setItem('user', JSON.stringify(result.user));

    window.location.href = result.user.category === 'patient' 
      ? 'patient-dashboard.html' 
      : 'doctor-dashboard.html';
  } catch (err) {
    alert('Server connection error. Make sure "node server.js" is running in terminal.');
  }
});

// Login Endpoint Fetch Call
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  };

  try {
    const res = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const result = await res.json();
    if (!res.ok) return alert(result.error || 'Invalid credentials');

    alert('Login successful!');
    localStorage.setItem('user', JSON.stringify(result.user));

    window.location.href = result.user.category === 'patient' 
      ? 'patient-dashboard.html' 
      : 'doctor-dashboard.html';
  } catch (err) {
    alert('Server connection error. Make sure "node server.js" is running in terminal.');
  }
});