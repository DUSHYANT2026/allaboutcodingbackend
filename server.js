// import express from "express";
// import "dotenv/config";
// import fetch from "node-fetch";
// import cors from "cors";
// import { GoogleGenerativeAI } from "@google/generative-ai";


// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());






// // const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// // // 1. Root route to verify server is live
// // app.get("/", (req, res) => {
// //   res.send("GitHub Proxy Server is Live and Running on Port 5000!");
// // });

// // // 2. Main GitHub Proxy Route
// // app.get("/github/:username", async (req, res) => {
// //   const { username } = req.params;
// //   console.log(`📡 Incoming request for GitHub user: ${username}`);

// //   // IMPORTANT: GitHub API REQUIRES a User-Agent. 
// //   // We use the 'token' prefix for Personal Access Tokens.
// // const headers = { 
// //   "Authorization": `token ${process.env.GITHUB_TOKEN}`,
// //   "Accept": "application/vnd.github.v3+json",
// //   "User-Agent": "Node-Proxy-Server" // GitHub requires a User-Agent header
// // };

// //   try {
// //     // Fetch user profile and repositories in parallel
// //     const [userRes, repoRes] = await Promise.all([
// //       fetch(`https://api.github.com/users/${username}`, { headers }),
// //       fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
// //     ]);
    
// //     // Check if GitHub returned an error (e.g., 401 Bad Credentials or 404 Not Found)
// //     if (!userRes.ok) {
// //        const errorData = await userRes.json();
// //        console.error(`❌ GitHub API Error (${userRes.status}):`, errorData.message);
// //        return res.status(userRes.status).json({ 
// //          error: errorData.message === "Bad credentials" 
// //            ? "Invalid GitHub Token. Check your .env file." 
// //            : "User not found on GitHub" 
// //        });
// //     }
// //     const user = await userRes.json();
// //     const repos = await repoRes.json();

// //     console.log(`✅ Successfully fetched data for ${username}`);
// //     res.json({ user, repos }); 
// //   } catch (err) {
// //     console.error("❌ Internal Server Error:", err.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });



// // const PORT = 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post('/api/generate-code', async (req, res) => {
//     try {
//         const { prompt } = req.body;
        
//         // Use 'gemini-1.5-flash' for speed or 'gemini-1.5-pro' for complex tasks
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         // Adding a system instruction ensures the output is focused on code
//         const fullPrompt = `You are an expert coder. Generate code for: ${prompt}. 
//                            Return only the code with brief comments.`;

//         const result = await model.generateContent(fullPrompt);
//         const response = await result.response;
//         const text = response.text();

//         res.json({ success: true, code: text });
//     } catch (error) {
//         console.error("Gemini Error:", error);
//         res.status(500).json({ success: false, error: "Failed to generate code." });
//     }
// });

// app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));