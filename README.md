# 🤖 Gemini Bugfix Bot

This project is a **GitHub Pull Request Feedback Bot** that automatically analyzes pull requests and provides feedback using the **Gemini API**.  
It is integrated with **GitHub Actions** and can be triggered whenever a pull request is opened or updated.

---

## 📂 Project Structure

```
GEMINI-BUGFIX-BOT/
│
├── .github/
│   └── workflows/
│       └── bugfix.yml         # GitHub Actions workflow file to automate feedback on PRs
│
├── src/
│   ├── config/
│   │   └── env.js             # Loads and manages environment variables
│   │
│   ├── routes/
│   │   └── githubWebhook.js   # Defines webhook routes for GitHub events (like PR opened)
│   │
│   ├── services/
│   │   ├── geminiService.js   # Handles communication with Gemini API for AI feedback
│   │   └── githubService.js   # Handles GitHub API interactions (e.g., posting comments)
│   │
│   ├── utils/
│   │   └── logger.js          # Logging utility for debugging and monitoring
│   │
│   └── index.js               # Main entry point (can start express server or handle PR)
│
├── .env                       # Environment variables (TOKENs, API keys, etc.)
├── package.json               # Dependencies and scripts
├── package-lock.json          # Auto-generated dependency lock file
├── server.js                  # (Optional) Server for handling GitHub webhooks
├── test.js                    # Example test or sandbox file
└── README.md                  # Project documentation
```

---

## ⚙️ Features

- 🧠 Uses **Gemini API** to review code changes in pull requests.
- 💬 Automatically posts detailed feedback comments on PRs.
- ⚡ Integrated with **GitHub Actions** for seamless automation.
- 🔒 Securely manages environment variables via `.env`.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/Gemini-Bugfix-Bot.git
cd Gemini-Bugfix-Bot
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup `.env` file
Create a `.env` file in the root directory:
```env
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key
REPO_NAME=your_github_username/Gemini-Bugfix-Bot
```

> You don’t need to manually add `PR_NUMBER`; it’s passed automatically by the GitHub Action.

---

## 🔄 GitHub Actions Workflow

Located in `.github/workflows/bugfix.yml`:

- Runs on pull request events (`opened`, `reopened`, `synchronize`).
- Checks out code and installs dependencies.
- Runs `node index.js` to process PR feedback.
- Uses repository and PR info from the GitHub Action context.

---

## 💡 Example Workflow (bugfix.yml)
```yaml
name: Gemini Bugfix Feedback

on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Run Feedback Bot
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          REPO_NAME: ${{ github.repository }}
        run: node index.js
```

---

## 🧩 How It Works

1. A **pull request** is created or updated.
2. The **GitHub Action** triggers and runs the bot.
3. The bot:
   - Fetches the PR details and changed files.
   - Sends the code to **Gemini API** for analysis.
   - Posts the feedback directly to the PR as comments.

---

## 🧱 Folder Purpose Summary

| Folder / File | Description |
|----------------|-------------|
| `.github/workflows/` | CI/CD automation (GitHub Actions) |
| `src/config/` | Configuration files, including environment variables |
| `src/routes/` | Express route handlers for GitHub webhooks |
| `src/services/` | API communication logic (Gemini & GitHub) |
| `src/utils/` | Utility and helper functions (e.g., logger) |
| `.env` | Environment variables like API keys |
| `server.js` | Optional Express server entry point |
| `index.js` | Main script executed by GitHub Action |
| `test.js` | Testing or sandbox purposes |

---

## 🔐 Environment Variables

| Variable | Description |
|-----------|-------------|
| `GITHUB_TOKEN` | GitHub Personal Access Token or Action secret |
| `GEMINI_API_KEY` | Gemini API Key |
| `REPO_NAME` | Full repo name (e.g., `username/Gemini-Bugfix-Bot`) |

---

## 🧠 Future Improvements

- Add **comment threading** for multiple code issues per file.
- Include **code severity scoring** (e.g., high/medium/low).
- Improve **AI prompt context** to support larger PRs.
- Add **unit tests** for services.

---

## 🪪 License
This project is licensed under the **MIT License** — free to use, modify, and distribute.
