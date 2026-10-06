import React from "react";
import PostList from "./PostList";
import posts from "./posts.json";

function App() {
  return (
    <div className="container mt-4">
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default App;
