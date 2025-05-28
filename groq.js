const axios = require("axios");
require("dotenv").config();

async function getSQLFromPrompt(prompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // 
        messages: [
          {
            role: "system",
            content:
              "You are an AI that ONLY generates SQL queries. If the input is not SQL-related, respond with exactly: INVALID_INPUT.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 256,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response?.data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Empty response from Groq");
    }

    if (reply.toUpperCase().includes("INVALID_INPUT")) {
      return null;
    }

    return reply;
  } catch (error) {
    console.error(" Groq API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate SQL query.");
  }
}

module.exports = { getSQLFromPrompt };
