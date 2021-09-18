export function isCI() {
  return !(process.env.CI === undefined || process.env.CI === "" || process.env.CI === "false")
}
