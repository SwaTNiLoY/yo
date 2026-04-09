const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/login', (req, res) => {
  const { username } = req.body;
  const validNames = ["Dolna", "DOLNA", "dolna"];
  if (validNames.includes(username)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});