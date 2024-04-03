import { endGroup, notice, startGroup } from "@actions/core"
import { error, info } from "ci-log"
import { join } from "path"
import semverValid from "semver/functions/valid"
import { getSuccessMessage } from "./cli-options"
import { setupGcc, setupMingw } from "./gcc/gcc"
import { activateGcovGCC, activateGcovLLVM } from "./gcovr/gcovr"
import { setupLLVM } from "./llvm/llvm"
import { setupMSVC } from "./msvc/msvc"
import { addEnv } from "./utils/env/addEnv"
import { getVersion } from "./versions/versions"

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
          await addEnv("CPPFLAGS", "")
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
          await addEnv("CPPFLAGS", "")
        }

        successMessages.push(getSuccessMessage("msvc", installationInfo))
        break
      }
      case "appleclang":
      case "applellvm": {
        notice("Assuming apple-clang is already installed")
        await Promise.all([addEnv("CC", "clang"), addEnv("CXX", "clang++")])
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
