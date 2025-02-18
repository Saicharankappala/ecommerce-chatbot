const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); // Correct OpenAI import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// OpenAI API Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Uses API Key from .env file
});

// Chatbot API Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Updated model
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
      max_tokens: 100,
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
// Fix Render Deployment
