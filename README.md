# 🤖 GitHub Pull Request Feedback Bot (Gemini API)

This project is a **GitHub Action-powered feedback bot** that automatically provides intelligent code review feedback on Pull Requests using the **Google Gemini API**.

---

## 🚀 Features
- Automatically runs when a Pull Request (PR) is opened or updated.
- Sends the PR’s code diff to the Gemini API for analysis.
- Posts detailed review comments directly on GitHub.
- Helps developers identify bugs, code smells, and best practice issues.
- Works with **Python**, **JavaScript**, **Java**, and more (language-agnostic).

---

## 🧠 How It Works

1. A developer opens or updates a Pull Request on GitHub.
2. The GitHub Action workflow triggers your `feedback-bot` app.
3. The bot:
   - Fetches PR details and diffs from GitHub’s API.
   - Sends the code to Gemini for review.
   - Posts structured feedback as PR comments.

---

## 🧩 Project Structure

```
.github/
└── workflows/
    └── pr-feedback.yml        # GitHub Action workflow file

src/
├── main.py                    # Main entry point for running the bot
├── github_client.py           # Handles GitHub API interactions
├── gemini_client.py           # Connects to Gemini API for code review
└── utils.py                   # Helper functions (formatting, logging, etc.)

.env                           # Contains environment variables
README.md                      # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/pr-feedback-bot.git
cd pr-feedback-bot
```

### 2. Create a `.env` File
Add your credentials in `.env`:

```
GITHUB_TOKEN=your_github_personal_access_token
GEMINI_API_KEY=your_gemini_api_key
```

> 🧩 **Optional:** You can also dynamically extract `REPO` and `PR_NUMBER` in your workflow, so they don’t need to be in `.env` directly.

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Locally (for testing)
```bash
python src/main.py
```

### 5. Deploy via GitHub Actions
In your repository, add this workflow file:

```yaml
name: PR Feedback Bot

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.10"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run feedback bot
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REPO: ${{ github.repository }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
        run: python src/main.py
```

---

## 🧾 Example Output

When a PR is created or updated, the bot posts a comment like:

```
🔍 **AI Code Review Feedback**
- [Line 42] Consider using a constant for repeated values.
- [Line 89] Function `calculateTotal` can be optimized using list comprehensions.
- [Line 123] Missing error handling for potential `NoneType` object.
```

---

## 💡 Future Improvements
- Add inline comments on exact PR lines.
- Support summary feedback via Markdown report.
- Add confidence score and AI explanations.
- Integration with Gemini Flash or Gemini 2 Pro.

---

## 🧑‍💻 Author
**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

---

## 📜 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
