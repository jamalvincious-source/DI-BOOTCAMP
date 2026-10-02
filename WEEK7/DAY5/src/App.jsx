import React, { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  // Function to handle voting
  const handleVote = (index) => {
    const newLanguages = [...languages];
    newLanguages[index].votes += 1;
    setLanguages(newLanguages);
  };

  return (
    <div className="App">
      <h1>React Voting App</h1>
      {languages.map((lang, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <span>{lang.name} - Votes: {lang.votes}</span>
          <button onClick={() => handleVote(index)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default App;