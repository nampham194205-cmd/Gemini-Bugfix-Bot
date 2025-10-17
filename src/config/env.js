export const loadEnv = () => {
  if (!process.env.GEMINI_API_KEY || !process.env.GITHUB_TOKEN) {
    console.error("❌ Missing environment variables!");
    process.exit(1);
  }
};
