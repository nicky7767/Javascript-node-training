const fs = require("fs");

function findLatestCommit(commits) {
  console.log("Stage 1: Filtering valid commits...");

  const validCommits = commits.filter((commit) => {
    const currentDate = new Date(commit.date);
    if (isNaN(currentDate.getTime())) {
      console.warn(
        `Skipping entry with invalid date: ${JSON.stringify(commit)}`
      );
      return false;
    }
    return true;
  });

  console.log("Stage 2: Finding the latest commit among valid commits...");

  if (validCommits.length === 0) {
    // Case: No valid commits found
    console.warn("No valid commits found.");
    return null;
  }

  const latestCommit = validCommits.reduce((prev, current) => {
    const prevDate = new Date(prev.date);
    const currentDate = new Date(current.date);
    return currentDate > prevDate ? current : prev;
  });

  console.log("Stage 3: Latest commit found.");

  return latestCommit;
}

const rawData = fs.readFileSync("./commitData.json");
const commitHistory = JSON.parse(rawData);
const latestCommit = findLatestCommit(commitHistory);
console.log(latestCommit);

module.exports = { findLatestCommit };
