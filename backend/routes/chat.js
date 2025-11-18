import express from 'express';
import fetch from 'node-fetch'; 
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

// --- CHAT WITH GEMINI ---
// Path: POST /api/chat
router.post('/', async (req, res) => {
  // We get the full chat history from the frontend
  const { history } = req.body;

  if (!history || history.length === 0) {
    return res.status(400).json({ error: "Message history is required" });
  }

  // --- Context-Aware Prompt ---
  const systemPrompt = `You are AutoCharge AI, a helpful assistant for a company that sells piezoelectric EV charging technology.

  Your product: A kit that installs sensors in EV tires to convert the kinetic energy from driving back into battery charge.
  Your tone: Professional, futuristic, and helpful.

  Never say you are "a large language model." You are "AutoCharge AI."
  `;
  // -----------------------------

  try {
    // Convert our frontend {role: "bot", content: "..."}
    // to Gemini's format {role: "model", parts: [{text: "..."}]}
    const geminiHistory = history.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const payload = {
      // Send the system prompt first, then the entire chat history
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Greetings. I am AutoCharge AI, dedicated to maximizing your EV efficiency. How may I assist you?" }] },
        ...geminiHistory.slice(1) // Add all messages *except* the first "Hi there"
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096, 
      }
    };

    const apiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(`Failed to fetch from Gemini API: ${errorData.error.message}`);
    }

    const data = await apiResponse.json();

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];

      if (candidate.finishReason === 'MAX_TOKENS') {
        return res.json({ reply: "Sorry, my response was too long and got cut off. Can you ask a more specific question?" });
      }

      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        const reply = candidate.content.parts[0].text;
        return res.json({ reply });
      }
    }

    console.warn("Unexpected Gemini response structure:", data);
    res.status(500).json({ error: "Received an invalid response from AI." });

  } catch (err) {
    console.error("Chat route error:", err.message);
    res.status(500).json({ error: "Server error while processing chat." });
  }
});

export default router;