import React, { useState } from "react";

const WEBHOOK_URL = "https://webhook.site/your-unique-url";

function Exercise4() {
  const [responseData, setResponseData] = useState("");

  const sendJsonData = async () => {
    try {
      const payload = JSON.stringify({
        key1: "myusername",
        email: "mymail@gmail.com",
        name: "Isaac",
        lastname: "Doe",
        age: 27,
      });

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: payload,
      });

      const result = await response.text();
      console.log(result);
      setResponseData(result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post JSON Data</h2>
      <button onClick={sendJsonData}>Send JSON</button>

      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <h4>Response:</h4>
          <pre>{responseData}</pre>
        </div>
      )}
    </div>
  );
}

export default Exercise4;
