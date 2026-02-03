app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({
      error: err.message || "Gemini generation failed",
    });
  }
});
