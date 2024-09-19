import { join } from "path"
import { endGroup, startGroup } from "@actions/core"
import { error, info } from "ci-log"
import semverValid from "semver/functions/valid"
import { getSuccessMessage } from "./cli-options.js"
import { setupGcc, setupMingw } from "./gcc/gcc.js"
import { activateGcovGCC, activateGcovLLVM } from "./gcovr/gcovr.js"
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
 * Detecting the compiler version. Divide the given string by `-` and use the second element as the version
 *
 * @param compilerAndVersion - The compiler and version string
 * @returns The compiler and version
 *
 * @nothrow It doesn't throw any error, but it logs the error if it fails to parse the compiler info
 */
export function getCompilerInfo(compilerAndVersion: string): CompilerInfo {
  try {
    const compilerAndMaybeVersion = compilerAndVersion.split("-")
    const compiler = compilerAndMaybeVersion[0]
    if (1 in compilerAndMaybeVersion) {
      const maybeVersion = compilerAndMaybeVersion[1]
      if (semverValid(maybeVersion) === null) {
        info(`Invalid semver version ${maybeVersion} used for the compiler.`)
      }
      return { compiler, version: maybeVersion }
    }
    return { compiler, version: undefined }
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
      installationInfo = await setupLLVM(
        getVersion("llvm", version, osVersion),
        join(setupCppDir, "llvm"),
        arch,
      )
      await activateGcovLLVM()
    } else if (compiler in gccSetups) {
      const gccVersion = getVersion("gcc", version, osVersion)
      installationInfo = await setupGcc(gccVersion, join(setupCppDir, "gcc"), arch)
      await activateGcovGCC(gccVersion)
    } else if (compiler in mingwSetups) {
      const gccVersion = getVersion("mingw", version, osVersion)
      installationInfo = await setupMingw(gccVersion, join(setupCppDir, "gcc"), arch)
      await activateGcovGCC(gccVersion)
    } else if (compiler in msvcSetups) {
      installationInfo = await setupMSVC(
        getVersion("msvc", version, osVersion),
        join(setupCppDir, "msvc"),
        arch,
      )
    } else if (compiler in appleClangSetups) {
      await setupAppleClang()
    } else {
      installationInfo = null
      errorMessages.push(`Unsupported compiler ${compiler}`)
    }
  } catch (err) {
    error(err as string | Error)
    errorMessages.push(`Failed to install the ${compiler} ${version}`)
  }

  if (installationInfo !== null) {
    successMessages.push(getSuccessMessage(compiler, installationInfo))
  }

  endGroup()
}
