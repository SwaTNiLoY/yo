const express = require('express');
const path = require('path');
const app = express();
const BASE_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
  const username = (req.body?.username || '').trim();
  const validNames = ["Dolna", "DOLNA", "dolna"];
  if (validNames.includes(username)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post('/page-data', (req, res) => {
  const username = (req.body?.username || '').trim();
  const validNames = ["Dolna", "DOLNA", "dolna"];
  if (!validNames.includes(username)) {
    return res.status(401).json({ success: false });
  }

  res.json({
    success: true,
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
  });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use, trying ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
}

if (!process.env.VERCEL) {
  startServer(BASE_PORT);
}

module.exports = app;