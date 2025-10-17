import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function postCommitComment({ owner, repo, commitSha, body }) {
  try {
    await octokit.repos.createCommitComment({
      owner,
      repo,
      commit_sha: commitSha,
      body,
    });
    console.log(`💬 Posted review comment to ${repo}@${commitSha}`);
  } catch (err) {
    console.error("❌ Failed to post comment:", err.message);
  }
}
