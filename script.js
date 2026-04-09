function getAllowedLogins() {
  const meta = document.querySelector('meta[name="allowed-logins"]');
  if (!meta || !meta.content.trim()) {
    return ['Dolna', 'DOLNA', 'dolna'];
  }

  return meta.content
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
}

async function validateWithServer(username) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return Boolean(result.success);
  } catch (error) {
    return null;
  }
}

async function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert('Please enter a login name.');
    return;
  }

  const serverResult = await validateWithServer(username);
  const allowedLogins = getAllowedLogins();
  const localResult = allowedLogins.includes(username);
  const isValid = serverResult === null ? localResult : serverResult;

  if (isValid) {
    showPage('hiddenMessagePage');
    return;
  }

  alert('Invalid login name. Try again.');
}

function setupNavigation() {
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const nextToWantBtn = document.getElementById('nextToWantBtn');
  const nextToFinalBtn = document.getElementById('nextToFinalBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', login);
  }

  if (usernameInput) {
    usernameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        login();
      }
    });
  }

  if (nextToWantBtn) {
    nextToWantBtn.addEventListener('click', () => showPage('wantPage'));
  }

  if (nextToFinalBtn) {
    nextToFinalBtn.addEventListener('click', () => showPage('finalPage'));
  }
}

setupNavigation();