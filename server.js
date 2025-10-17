import express from "express";
import dotenv from "dotenv";
import githubWebhookRouter from "./src/routes/githubWebhook.js";
import { loadEnv } from "./src/config/env.js";

dotenv.config();
loadEnv();

const app = express();
app.use(express.json());

app.use("/github-webhook", githubWebhookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
