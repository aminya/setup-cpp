import { addEnv } from "os-env"
import semverMajor from "semver/functions/major"
import semverValid from "semver/functions/valid"
import { setupPipPack } from "../utils/setup/setupPipPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupGcovr(version: string | undefined, _setupDir: string, _arch: string) {
  return setupPipPack("gcovr", version)
}

export function activateGcovLLVM() {
  return addEnv("GCOV", "llvm-cov gcov")
}

export function activateGcovGCC(gccVersion: string) {
  const gccSemver = semverValid(gccVersion)
  const gccMajor = gccSemver !== null ? semverMajor(gccSemver) : gccVersion
  const gcov = gccMajor !== "" ? `gcov-${gccMajor}` : "gcov"

  return addEnv("GCOV", gcov)
}
