import { addEnv } from "envosman"
import semverMajor from "semver/functions/major"
import semverValid from "semver/functions/valid"
import { hasAptGet, installAptPack } from "setup-apt"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupGcovr({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  if (hasAptGet() && (version === undefined || version === "")) {
    // use apt on Ubuntu/Debian if version is not specified
    return installAptPack([{ name: "gcovr", version }])
  }
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
