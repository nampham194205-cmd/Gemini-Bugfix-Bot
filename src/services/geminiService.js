import fetch from "node-fetch";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  process.env.GEMINI_API_KEY;

export async function analyzeCommitDiff(diff) {
  const prompt = `
You are an AI code reviewer.
Analyze this Git diff and identify:
1. Bugs or risky code.
2. Code smells or best-practice issues.
3. Suggested fixes and improvements.

Here is the diff:
${diff}
`;

  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No issues found 🎉"
  );
}
