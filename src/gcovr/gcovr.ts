import { addEnv } from "envosman"
import semverMajor from "semver/functions/major"
import semverValid from "semver/functions/valid"
import { rcOptions } from "../options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupGcovr(version: string | undefined, _setupDir: string, _arch: string) {
  return setupPipPack("gcovr", version)
}

export function activateGcovLLVM() {
  return addEnv("GCOV", "llvm-cov gcov", rcOptions)
}

export function activateGcovGCC(gccVersion: string) {
  const gccSemver = semverValid(gccVersion)
  const gccMajor = gccSemver !== null ? semverMajor(gccSemver) : gccVersion
  const gcov = gccMajor !== "" ? `gcov-${gccMajor}` : "gcov"

  return addEnv("GCOV", gcov, rcOptions)
}
