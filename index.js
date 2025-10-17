import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.REPO;

async function getChangedFiles() {
  const url = `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/files`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });
  return res.json();
}

async function analyzeCodeWithGemini(code, filename) {
  const prompt = `
You are a senior code reviewer. Analyze the following code from ${filename}.
Find bugs, potential issues, and improvements.

Code:
${code}
  `;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
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

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback found."
  );
}

async function postComment(body) {
  const url = `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });
}

async function main() {
  console.log("🚀 Gemini Bugfix Bot running on PR #" + PR_NUMBER);

  const files = await getChangedFiles();
  let feedback = "";

  for (const file of files) {
    if (!file.filename.endsWith(".js")) continue;

    console.log(`🔍 Analyzing ${file.filename}`);
    const codeRes = await fetch(file.raw_url);
    const code = await codeRes.text();

    const analysis = await analyzeCodeWithGemini(code, file.filename);
    feedback += `### 🧩 ${file.filename}\n${analysis}\n\n`;
  }

  if (!feedback) feedback = "✅ No JavaScript files found to review.";

  await postComment(`🤖 **Gemini Bugfix Report**\n\n${feedback}`);
  console.log("✅ Feedback posted to PR!");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
