import express from "express";
import { analyzeCommitDiff } from "../services/geminiService.js";
import { postCommitComment } from "../services/githubService.js";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    if (event === "push") {
      const { commits, repository } = payload;

      for (const commit of commits) {
        const diffUrl = commit.url + ".diff";
        const diff = await fetch(diffUrl).then((r) => r.text());

        console.log(`🧩 Analyzing commit: ${commit.id}`);

        const feedback = await analyzeCommitDiff(diff);

        await postCommitComment({
          owner: repository.owner.name || repository.owner.login,
          repo: repository.name,
          commitSha: commit.id,
          body: `🤖 **Gemini Code Review**:\n${feedback}`,
        });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
