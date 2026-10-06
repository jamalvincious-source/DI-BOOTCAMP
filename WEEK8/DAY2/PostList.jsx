import React from "react";

function App() {
  const postData = async () => {
    try {
      const response = await fetch("YOUR_WEBHOOK_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key1: "myusername",
          email: "mymail@gmail.com",
          name: "Isaac",
          lastname: "Doe",
          age: 27
        })
      });

      const data = await response.json();
      console.log("Response from webhook:", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React POST JSON Demo</h2>
      <button onClick={postData}>Send Data</button>
    </div>
  );
}

export default App;

