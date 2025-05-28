const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { getSQLFromPrompt } = require("./groq");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve your index.html

app.post("/generate-sql", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const query = await getSQLFromPrompt(prompt);

    if (!query) {
      return res.status(400).json({ error: "❌Plz Enter The SQL-related question This is Invalid input." });
    }

    res.json({ query });
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ error: "Error generating SQL" });
  }
});
const PORT=3000;
app.listen(PORT, () => console.log("Server running at http://localhost:"+PORT));
