const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

const words = [
  "serendipity", "ephemeral", "luminous", "zenith", "quixotic",
  "mellifluous", "sonder", "petrichor", "lilt", "sonder"
];

app.use(cors());

app.get('/api/lucky-word', (req, res) => {
  const luckyWord = words[Math.floor(Math.random() * words.length)];
  res.json({ luckyWord });
});

app.listen(PORT, () => {
  console.log(`Lucky Word server running on http://localhost:${PORT}`);
}); 