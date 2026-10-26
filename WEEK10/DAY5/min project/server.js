const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'story-secret-key-12345';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = [];
const stories = [
  {
    id: 1,
    title: 'The Moonlit Garden',
    content: 'A shy girl discovered a hidden garden where the flowers whispered the future.',
    authorId: 1,
    author: 'admin',
    collaborators: ['admin'],
    comments: [],
  },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const createToken = (user) =>
  jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Collaborative Storytelling API is running' });
});

app.post('/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const userExists = users.some((user) => user.username.toLowerCase() === username.toLowerCase());
    if (userExists) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      username,
      passwordHash,
      displayName: displayName || username,
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, displayName: newUser.displayName },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while registering the user.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find((item) => item.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = createToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, displayName: user.displayName },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while logging in.' });
  }
});

app.get('/profile', authenticateToken, (req, res) => {
  const user = users.find((item) => item.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    user: { id: user.id, username: user.username, displayName: user.displayName },
  });
});

app.get('/stories', authenticateToken, (req, res) => {
  res.json({ stories });
});

app.get('/stories/:id', authenticateToken, (req, res) => {
  const story = stories.find((item) => item.id === Number(req.params.id));

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  res.json({ story });
});

app.post('/stories', authenticateToken, (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const user = users.find((item) => item.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newStory = {
      id: Date.now(),
      title,
      content,
      authorId: user.id,
      author: user.username,
      collaborators: [user.username],
      comments: [],
    };

    stories.unshift(newStory);

    res.status(201).json({ message: 'Story created successfully', story: newStory });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while creating the story.' });
  }
});

app.patch('/stories/:id', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const story = stories.find((item) => item.id === Number(req.params.id));

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (story.authorId !== req.user.id) {
    return res.status(403).json({ message: 'You are not allowed to edit this story' });
  }

  if (title) story.title = title;
  if (content) story.content = content;

  res.json({ message: 'Story updated successfully', story });
});

app.delete('/stories/:id', authenticateToken, (req, res) => {
  const storyIndex = stories.findIndex((item) => item.id === Number(req.params.id));

  if (storyIndex === -1) {
    return res.status(404).json({ message: 'Story not found' });
  }

  const story = stories[storyIndex];

  if (story.authorId !== req.user.id) {
    return res.status(403).json({ message: 'You are not allowed to delete this story' });
  }

  stories.splice(storyIndex, 1);
  res.json({ message: 'Story deleted successfully' });
});

app.post('/stories/:id/comments', authenticateToken, (req, res) => {
  const { comment } = req.body;
  const story = stories.find((item) => item.id === Number(req.params.id));

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: 'Comment cannot be empty' });
  }

  const user = users.find((item) => item.id === req.user.id);
  const newComment = {
    id: Date.now(),
    author: user ? user.username : 'Unknown User',
    text: comment,
    createdAt: new Date().toISOString(),
  };

  story.comments.push(newComment);

  res.status(201).json({ message: 'Comment added', comment: newComment });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
