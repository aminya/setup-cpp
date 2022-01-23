export function isCI() {
  return process.env.CI === "true"
}

export function isGitHubCI() {
  return isCI() && process.env.GITHUB_ACTIONS === "true"
}
