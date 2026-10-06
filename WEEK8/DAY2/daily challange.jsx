import React, { useState } from "react";

const posts = [
  { id: 1, title: "Hello World", content: "Try React is awesome." },
  { id: 2, title: "React Basics", content: "State and events make apps interactive." },
  { id: 3, title: "JSON Data", content: "You can render data from arrays and objects." }
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong. Please try again.</h3>;
    }

    return this.props.children;
  }
}

function DailyChallenge() {
  const [count, setCount] = useState(0);
  const [showPosts, setShowPosts] = useState(true);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const togglePosts = () => setShowPosts((prev) => !prev);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Daily Challenge</h1>

      <button onClick={handleIncrement} style={{ marginRight: "10px" }}>
        Clicked: {count}
      </button>

      <button onClick={togglePosts}>{showPosts ? "Hide Posts" : "Show Posts"}</button>

      {showPosts && (
        <ErrorBoundary>
          <div style={{ marginTop: "20px" }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px"
                }}
              >
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default DailyChallenge;
