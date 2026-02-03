import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Using the 2026 stable high-speed model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ result: text }); // Ensure this key matches your React 'data.result'
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Model failed to generate code." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
