import { join } from "path"
import { endGroup, notice, startGroup } from "@actions/core"
import { error, info } from "ci-log"
import { addEnv } from "envosman"
import semverValid from "semver/functions/valid"
import { getSuccessMessage, rcOptions } from "./cli-options.js"
import { setupGcc, setupMingw } from "./gcc/gcc.js"
import { activateGcovGCC, activateGcovLLVM } from "./gcovr/gcovr.js"
import { setupLLVM } from "./llvm/llvm.js"
import { setupMSVC } from "./msvc/msvc.js"
import { getVersion } from "./versions/versions.js"

/** Detecting the compiler version. Divide the given string by `-` and use the second element as the version */
export function getCompilerInfo(compilerAndVersion: string) {
  const compilerAndMaybeVersion = compilerAndVersion.split("-")
  const compiler = compilerAndMaybeVersion[0]
  if (1 in compilerAndMaybeVersion) {
    const maybeVersion = compilerAndMaybeVersion[1]
    if (semverValid(maybeVersion) !== null) {
      return { compiler, version: maybeVersion }
    } else {
      info(`Invalid semver version ${maybeVersion} used for the compiler.`)
      return { compiler, version: maybeVersion }
    }
  }
  return { compiler, version: undefined }
}

/** Installing the specified compiler */
export async function installCompiler(
  compilerAndVersion: string,
  osVersion: number[] | null,
  setupCppDir: string,
  arch: string,
  successMessages: string[],
  hasLLVM: boolean,
  errorMessages: string[],
) {
  try {
    const { compiler, version } = getCompilerInfo(compilerAndVersion)

    // install the compiler. We allow some aliases for the compiler name
    startGroup(`Installing ${compiler} ${version ?? ""}`)
    switch (compiler) {
      case "llvm":
      case "clang":
      case "clang++": {
        const installationInfo = await setupLLVM(
          getVersion("llvm", version, osVersion),
          join(setupCppDir, "llvm"),
          arch,
        )

        await activateGcovLLVM()

        successMessages.push(getSuccessMessage("llvm", installationInfo))
        break
      }
      case "gcc":
      case "mingw":
      case "cygwin":
      case "msys": {
        const gccVersion = compiler === "mingw"
          ? getVersion("mingw", version, osVersion)
          : getVersion("gcc", version, osVersion)
        const installationInfo = compiler === "mingw"
          ? await setupMingw(gccVersion, join(setupCppDir, "gcc"), arch)
          : await setupGcc(gccVersion, join(setupCppDir, "gcc"), arch)

        if (hasLLVM) {
          // remove back the added CPPFLAGS of LLVM that include the LLVM headers
          await addEnv("CPPFLAGS", "", rcOptions)
        }

        await activateGcovGCC(gccVersion)

        successMessages.push(getSuccessMessage("gcc", installationInfo))
        break
      }
      case "cl":
      case "msvc":
      case "msbuild":
      case "vs":
      case "visualstudio":
      case "visualcpp":
      case "visualc++": {
        const installationInfo = await setupMSVC(
          getVersion("msvc", version, osVersion),
          join(setupCppDir, "msvc"),
          arch,
        )

        if (hasLLVM) {
          // remove the CPPFLAGS of LLVM that include the LLVM headers
          await addEnv("CPPFLAGS", "", rcOptions)
        }

        successMessages.push(getSuccessMessage("msvc", installationInfo))
        break
      }
      case "appleclang":
      case "applellvm": {
        notice("Assuming apple-clang is already installed")
        await Promise.all([addEnv("CC", "clang", rcOptions), addEnv("CXX", "clang++", rcOptions)])
        successMessages.push(getSuccessMessage("apple-clang", undefined))
        break
      }
      default: {
        errorMessages.push(`Unsupported compiler ${compiler}`)
      }
    }
  } catch (err) {
    error(err as string | Error)
    errorMessages.push(`Failed to install the ${compilerAndVersion}`)
  }

  endGroup()
}
