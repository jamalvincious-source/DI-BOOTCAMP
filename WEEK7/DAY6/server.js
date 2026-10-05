const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const RSS_URL = 'https://thefactfile.org/feed/';

async function getFeed() {
  const feed = await parser.parseURL(RSS_URL);
  return feed.items;
}

app.get('/', async (req, res) => {
  try {
    const posts = await getFeed();
    res.render('pages/index', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading feed');
  }
});

app.get('/search', (req, res) => {
  res.render('pages/search', { posts: [] });
});

app.post('/search/title', async (req, res) => {
  try {
    const { title } = req.body;
    const posts = await getFeed();
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
    res.render('pages/search', { posts: filteredPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching by title');
  }
});

app.post('/search/category', async (req, res) => {
  try {
    const { category } = req.body;
    const posts = await getFeed();
    const filteredPosts = posts.filter(post =>
      post.categories && post.categories.some(cat =>
        cat.toLowerCase() === category.toLowerCase()
      )
    );
    res.render('pages/search', { posts: filteredPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching by category');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
