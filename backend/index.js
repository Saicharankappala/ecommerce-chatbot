const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); // Correct OpenAI import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// ✅ Initialize OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load API Key from Render environment
});

// ✅ ADD THIS ROUTE TO FIX "Cannot GET /"
app.get("/", (req, res) => {
  res.send("AI-Powered E-Commerce Chatbot Backend is Running!");
});

// ✅ FIX `/chat` Route (openai was missing before)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required!" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
      max_tokens: 100,
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("🔥 ERROR:", error);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
