import React, { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      setResponse("Oops! Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
      
      <input
        type="text"
        className="p-2 border border-gray-400 rounded w-80"
        placeholder="Ask me something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {response && <p className="mt-4 text-lg">{response}</p>}
    </div>
  );
};

export default App;
