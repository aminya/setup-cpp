/**
 * Get the environment variables to use for the apt command
 * @param apt The apt command to use
 * @private Used internally
 */

export function getAptEnv(apt: string) {
  const env: NodeJS.ProcessEnv = { ...process.env, DEBIAN_FRONTEND: "noninteractive" }

  if (apt === "nala") {
    // if LANG/LC_ALL is not set, enable utf8 otherwise nala fails because of ASCII encoding
    if (env.LANG === undefined) {
      env.LANG = "C.UTF-8"
    }
    if (env.LC_ALL === undefined) {
      env.LC_ALL = "C.UTF-8"
    }
  }

  return env
}
