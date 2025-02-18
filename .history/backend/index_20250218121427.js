const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); // Correct OpenAI import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// ✅ ADD THIS ROUTE TO FIX "Cannot GET /"
app.get("/", (req, res) => {
  res.send("AI-Powered E-Commerce Chatbot Backend is Running!");
});

// Chatbot API Route
app.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ error: "Message is required!" });
      }
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // Ensure model is correct
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
        max_tokens: 100,
      });
  
      res.json({ reply: response.choices[0].message.content.trim() });
    } catch (error) {
      console.error("🔥 ERROR:", error);  // Log error for debugging
  
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message,  // Show the real error message
      });
    }
  }); 

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
