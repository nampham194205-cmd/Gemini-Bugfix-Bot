// index.js
import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  console.log("🚀 Gemini Bugfix Bot is running...");

  // Example: analyze a dummy file
  const codeSample = `function add(a, b) { return a + b; }`;

  const prompt = `
  You are a bug-fixing assistant. Analyze this code and suggest improvements or potential bugs:
  ${codeSample}
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  console.log("🧠 Gemini says:");
  console.log(
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
  );
}

main().catch(console.error);
