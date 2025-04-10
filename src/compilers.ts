import { join } from "path"
import { endGroup, startGroup } from "@actions/core"
import { error, info } from "ci-log"
import semverValid from "semver/functions/valid"
import { setupGcc } from "./gcc/gcc.js"
import { setupMingw } from "./gcc/mingw.js"
import { activateGcovGCC, activateGcovLLVM } from "./gcovr/gcovr.js"
import { getSuccessMessage } from "./installTool.js"
import { setupAppleClang } from "./llvm/apple-clang.js"
import { setupLLVM } from "./llvm/llvm.js"
import { setupMSVC } from "./msvc/msvc.js"
import { appleClangSetups, gccSetups, llvmSetups, mingwSetups, msvcSetups } from "./tool.js"
import type { InstallationInfo } from "./utils/setup/setupBin.js"
import { getVersion } from "./versions/versions.js"

export type CompilerInfo = {
  compiler: string
  version: string | undefined
}

/**
 * Match version patterns like:
 * - Standard versions: digit.digit.digit
 * - Semver with pre-release: digit.digit.digit-alpha.1
 * - Semver with build metadata: digit.digit.digit+build.123
 * - MSVC style: digit.digit.digit.digit
 * - Year versions: 2015, 2017, etc.
 */
const versionPattern = /[.-]((?:\d{4}|\d+(?:\.\d+)*(?:-[\w.-]+)?(?:\+[\w.-]+)?)$)/

/**
 * Detecting the compiler version by looking for a version-like pattern.
 * Supports compiler names that contain hyphens and various version formats.
 *
 * @param compilerAndVersion - The compiler and version string
 * @returns The compiler and version
 *
 * @nothrow It doesn't throw any error, but it logs the error if it fails to parse the compiler info
 */
export function getCompilerInfo(compilerAndVersion: string): CompilerInfo {
  try {
    const match = compilerAndVersion.match(versionPattern)

    if (match === null) {
      return { compiler: compilerAndVersion, version: undefined }
    }

    const version = match[1]
    const compiler = compilerAndVersion.slice(0, match.index).replace(/[.-]$/, "")

    // Only check semver for non-year versions
    if (!version.match(/^\d{4}$/) && semverValid(version) === null) {
      info(`Non-semver version format: ${version}`)
    }
    return { compiler, version }
  } catch (err) {
    error(`Failed to parse the compiler info ${compilerAndVersion}: ${err}`)
    return { compiler: compilerAndVersion, version: undefined }
  }
}

/** Installing the specified compiler */
export async function installCompiler(
  compiler: string,
  version: string | undefined,
  osVersion: number[] | null,
  setupCppDir: string,
  arch: string,
  successMessages: string[],
  errorMessages: string[],
) {
  let installationInfo: InstallationInfo | undefined | void | null // null means the compiler is not supported
  try {
    // install the compiler. We allow some aliases for the compiler name
    startGroup(`Installing ${compiler} ${version ?? ""}`)
    if (compiler in llvmSetups) {
      installationInfo = await setupLLVM({
        version: getVersion("llvm", version, osVersion),
        setupDir: join(setupCppDir, "llvm"),
        arch,
      })
      await activateGcovLLVM()
    } else if (compiler in gccSetups) {
      const gccVersion = getVersion("gcc", version, osVersion)
      installationInfo = await setupGcc({ version: gccVersion, setupDir: join(setupCppDir, "gcc"), arch })
      await activateGcovGCC(gccVersion)
    } else if (compiler in mingwSetups) {
      const gccVersion = getVersion("mingw", version, osVersion)
      installationInfo = await setupMingw({ version: gccVersion, setupDir: join(setupCppDir, "gcc"), arch })
      await activateGcovGCC(gccVersion)
    } else if (compiler in msvcSetups) {
      installationInfo = await setupMSVC({
        version: getVersion("msvc", version, osVersion),
        setupDir: join(setupCppDir, "msvc"),
        arch,
      })
    } else if (compiler in appleClangSetups) {
      await setupAppleClang()
    } else {
      installationInfo = null
      errorMessages.push(`Unsupported compiler ${compiler}`)
    }
  } catch (err) {
    error(err as string | Error)
    if (err instanceof Error) {
      error(err.stack ?? "")
    }
    errorMessages.push(`Failed to install the ${compiler} compiler ${version}`)
  }

  if (installationInfo !== null) {
    successMessages.push(getSuccessMessage(compiler, installationInfo))
  }

  endGroup()
}
