import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.get("/github/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
    ]);

    if (!userRes.ok || !repoRes.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await userRes.json();
    const repos = await repoRes.json();

    res.json({ user, repos });
  } catch (err) {
    res.status(500).json({ error: "GitHub API error" });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
