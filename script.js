function showPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
}

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

const localPageFallback = {
  pages: {
    hiddenMessagePage: `
      <div class="content-box">
        <span class="badge">Welcome</span>
        <h1>Great — you reached my hidden message</h1>
        <p class="details">I just made this only for you.</p>
        <button id="nextToWantBtn" type="button">Next</button>
      </div>
    `,
    wantPage: `
      <div class="content-box">
        <span class="badge">A secret truth</span>
        <h1>Maybe it took you a long or maybe not to reach out here</h1>
        <p class="details">But there is one message I want you to read carefully.</p>
        <button id="nextToFinalBtn" type="button">Continue</button>
      </div>
    `,
    finalPage: `
      <div class="message-card">
        <span class="badge">Hi</span>
        <h1>✨ Dolna,</h1>
        <p class="details">Every moment without you feels like the world is empty for me. I know it's too early for me to approach you but still don't misjudge me. Only ALLAH knows how many times I cried for you and prayed for your happiness in my daily prayers.</p>
        <p class="details"><strong>The matter is I only want you as my life partner which I daily request to ALLAH for.</strong></p>
        <p class="details">No worries, I will not rush you or will not push you or anything like that rather what I said you that day is....</p>
        <p class="details">I am still waiting for you, and until my last breath I will wait.</p>
        <button id="nextToExtraBtn" type="button" class="timer-button">Continue</button>
      </div>
    `,
    extraPage: `
      <div class="message-card">
        <span class="badge">A careful truth</span>
        <h1>One more thing I need to say</h1>
        <p class="details"><strong>Jani na tumi aita vabo ki vabo na</strong> but let me clear from my end: <span class="highlight">j tomake ami r ager moto message dei na tai bole j ami tomake vule gesi or tomar theke ami distance kori amn ta na</span>. Ami always tomar kotha chinta kori tomar kotha vabi, kintu ami chai na jaate amr unnecessary messages tomake irritate koruk.</p>
        <p class="details"><span class="highlight">Yup!! Ami tomar jonne onek mane onek weak r pagol ja tomar imagination er bahire.</span> But ami amr feelings shobar shamne express korte chai na <strong>(it's too early)</strong> tai vercity te tomar face to face asi na.</p>
        <p class="details">But ami always tomar jonne bahire wait kori just tomake aral theke 1 bar dekhar jonne, r tomake dekhar ai feelings ta bole bujano possible na.</p>
        <p class="details"><strong>Well thank you for your time.</strong></p>
        <p class="details">Stay Happy and Stay blessed. Keep smiling and enjoy what you are doing.</p>
        <button id="nextToTimerBtn" type="button" class="timer-button">Countdown started since</button>
      </div>
    `,
    timerPage: `
      <div class="message-card">
        <span class="badge">Countdown started</span>
        <h1>Daily moments timer</h1>
        <p class="details">This timer tracks time from 28 March 2026 at 4:19 AM and updates daily moments live.</p>
        <div id="timerValue" class="timer-value">Loading timer…</div>
        <p class="timer-note">The counter updates every second to keep your moments fresh.</p>
      </div>
    `
  }
};

function showError(message) {
  const errorEl = document.getElementById('loginError');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError() {
  showError('');
}

let pagesRendered = false;

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>Kii</strong>${message}`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }, 3200);
}

async function fetchPageData(username) {
  try {
    const response = await fetch('/page-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (err) {
    return null;
  }
}

function renderHiddenPages(pageData) {
  if (!pageData || !pageData.pages) {
    return;
  }

  const hiddenMessagePage = document.getElementById('hiddenMessagePage');
  const wantPage = document.getElementById('wantPage');
  const finalPage = document.getElementById('finalPage');
  const extraPage = document.getElementById('extraPage');
  const timerPage = document.getElementById('timerPage');

  if (hiddenMessagePage) {
    hiddenMessagePage.innerHTML = pageData.pages.hiddenMessagePage;
  }

  if (wantPage) {
    wantPage.innerHTML = pageData.pages.wantPage;
  }

  if (finalPage) {
    finalPage.innerHTML = pageData.pages.finalPage;
  }

  if (extraPage) {
    extraPage.innerHTML = pageData.pages.extraPage;
  }

  if (timerPage) {
    timerPage.innerHTML = pageData.pages.timerPage;
  }
}

function setupHiddenNavigation() {
  const nextToWantBtn = document.getElementById('nextToWantBtn');
  const nextToFinalBtn = document.getElementById('nextToFinalBtn');
  const nextToExtraBtn = document.getElementById('nextToExtraBtn');
  const nextToTimerBtn = document.getElementById('nextToTimerBtn');

  if (nextToWantBtn) {
    nextToWantBtn.addEventListener('click', () => showPage('wantPage'));
  }

  if (nextToFinalBtn) {
    nextToFinalBtn.addEventListener('click', () => showPage('finalPage'));
  }

  if (nextToExtraBtn) {
    nextToExtraBtn.addEventListener('click', () => showPage('extraPage'));
  }

  if (nextToTimerBtn) {
    nextToTimerBtn.addEventListener('click', () => showPage('timerPage'));
  }
}

async function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    showError('Please enter a login name.');
    return;
  }

  clearError();
  const serverResult = await validateWithServer(username);
  const allowedLogins = getAllowedLogins();
  const isValid = serverResult === null ? allowedLogins.includes(username) : serverResult;

  if (!isValid) {
    showToast('Tomake ami ai name a daki? 😐');
    return;
  }

  const pageData = await fetchPageData(username);
  if (!pageData || !pageData.success) {
    if (serverResult === null) {
      showToast('Server unavailable; loading local content fallback.');
      renderHiddenPages(localPageFallback);
      setupHiddenNavigation();
      pagesRendered = true;
      showPage('hiddenMessagePage');
      return;
    }

    showToast('Unable to load the hidden content.');
    return;
  }

  if (!pagesRendered) {
    renderHiddenPages(pageData);
    setupHiddenNavigation();
    pagesRendered = true;
  }

  showPage('hiddenMessagePage');
}

function updateTimer() {
  const startDate = new Date('2026-03-28T04:19:00');
  const now = new Date();
  let diff = now - startDate;
  if (diff < 0) {
    diff = 0;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const timerEl = document.getElementById('timerValue');
  if (timerEl) {
    timerEl.textContent = `${days} days ${hours}h ${minutes}m ${seconds}s`;
  }
}

function startTimer() {
  updateTimer();
  setInterval(updateTimer, 1000);
}

function setupNavigation() {
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const nextToWantBtn = document.getElementById('nextToWantBtn');
  const nextToFinalBtn = document.getElementById('nextToFinalBtn');
  const nextToExtraBtn = document.getElementById('nextToExtraBtn');
  const nextToTimerBtn = document.getElementById('nextToTimerBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', login);
  }

  if (usernameInput) {
    usernameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        login();
      }
    });

    usernameInput.addEventListener('input', clearError);
  }

  if (nextToWantBtn) {
    nextToWantBtn.addEventListener('click', () => showPage('wantPage'));
  }

  if (nextToFinalBtn) {
    nextToFinalBtn.addEventListener('click', () => showPage('finalPage'));
  }

  if (nextToExtraBtn) {
    nextToExtraBtn.addEventListener('click', () => showPage('extraPage'));
  }

  if (nextToTimerBtn) {
    nextToTimerBtn.addEventListener('click', () => showPage('timerPage'));
  }

}

setupNavigation();
startTimer();