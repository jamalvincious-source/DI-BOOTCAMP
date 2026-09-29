const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Function to fetch posts from JSONPlaceholder
async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch posts");
  }
}

// Routes

// READ ALL - fetch posts from JSONPlaceholder
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("Data successfully retrieved and sent as response");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// CREATE - simulate creating a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    if (!title || !body || !userId) {
      return res.status(400).json({ error: "title, body, and userId are required" });
    }

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// UPDATE - simulate updating a post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, userId } = req.body;

    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      body,
      userId
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE - simulate deleting a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.json({ message: `Post ${id} deleted` });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
