import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messages = [{ role: "user", content: message }];

    try {
      const result = await axios.post("http://localhost:5000/api/openai", {
        messages,
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error making the API request:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>OpenAI Chat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleChange}
          rows="4"
          cols="50"
          placeholder="Enter your message here..."
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
