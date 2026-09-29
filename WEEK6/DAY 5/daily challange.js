const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Emoji dataset
const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '⚽', name: 'Soccer Ball' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '📚', name: 'Books' }
];

// Game state
let leaderboard = [];
let currentScore = 0;

// Utility: get random emoji and options
function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correctEmoji = emojis[randomIndex];

  // Pick 3 random distractors
  let options = [correctEmoji.name];
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);

  return { emoji: correctEmoji.emoji, correct: correctEmoji.name, options };
}

// Route: get a new emoji challenge
app.get('/api/game', (req, res) => {
  const challenge = getRandomEmoji();
  res.json({
    emoji: challenge.emoji,
    options: challenge.options
  });
});

// Route: submit guess
app.post('/api/guess', (req, res) => {
  const { guess, correct } = req.body;

  if (!guess || !correct) {
    return res.status(400).json({ message: "Guess and correct answer required" });
  }

  if (guess === correct) {
    currentScore++;
    res.json({ result: "Correct!", score: currentScore });
  } else {
    res.json({ result: "Wrong!", score: currentScore });
  }
});

// Route: save score to leaderboard
app.post('/api/leaderboard', (req, res) => {
  const { player } = req.body;
  if (!player) {
    return res.status(400).json({ message: "Player name required" });
  }

  leaderboard.push({ player, score: currentScore });
  leaderboard.sort((a, b) => b.score - a.score);

  res.json({ message: "Score saved!", leaderboard });
});

// Route: view leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Start server
app.listen(PORT, () => {
  console.log(`Emoji game server running on http://localhost:${PORT}`);
});
