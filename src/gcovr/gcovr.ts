import { addEnv } from "envosman"
import semverMajor from "semver/functions/major"
import semverValid from "semver/functions/valid"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupGcovr({ version }: SetupOptions) {
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
