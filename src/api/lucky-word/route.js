import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

const words = [
  "serendipity", "ephemeral", "luminous", "zenith", "quixotic",
  "mellifluous", "sonder", "petrichor", "lilt", "sonder"
];

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/lucky-word', (req, res) => {
  const luckyWord = words[Math.floor(Math.random() * words.length)];
  res.json({ luckyWord });
});
