import * as core from "@actions/core"
import { setupBrew } from "./brew/brew"
import { setupCcache } from "./ccache/ccache"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupCppcheck } from "./cppcheck/cppcheck"
import { setupDoxygen } from "./doxygen/doxygen"
import { setupGcovr } from "./gcovr/gcovr"
import { setupLLVM } from "./llvm/llvm"
import { setupMeson } from "./meson/meson"
import { setupMSVC } from "./msvc/msvc"
import { setupNinja } from "./ninja/ninja"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage"
import { setupPython } from "./python/python"
import semverValid from "semver/functions/valid"
import { getVersion } from "./default_versions"

function maybeGetInput(key: string) {
  const value = core.getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}

export async function main(): Promise<number> {
  const arch = core.getInput("architecture") || process.arch
  const setupCppDir = process.env.SETUP_CPP_DIR ?? "~/setup_cpp"
  try {
    const maybeCompiler = maybeGetInput("compiler")
    if (maybeCompiler !== undefined) {
      const compilerAndMaybeVersion = maybeCompiler.split("-")
      const compiler = compilerAndMaybeVersion[0]
      let version: string | undefined
      if (1 in compilerAndMaybeVersion) {
        const maybeVersion = compilerAndMaybeVersion[1]
        if (semverValid(maybeVersion) !== null) {
          version = maybeVersion
        } else {
          core.error(`Invalid version ${maybeVersion} used for the compiler. Using the default version...`)
        }
      }

      switch (compiler) {
        case "llvm":
        case "clang":
        case "clang++": {
          await setupLLVM(getVersion("llvm", version), setupCppDir)
          break
        }
        case "cl":
        case "msvc":
        case "msbuild":
        case "vs":
        case "visualstudio":
        case "visualcpp":
        case "visualc++": {
          await setupMSVC(getVersion("msvc", version), setupCppDir)
          break
        }
        default: {
          core.error(`Unsupported compiler ${compiler}`)
        }
      }
    }

    // setup cmake
    const cmakeVersion = maybeGetInput("cmake")
    if (cmakeVersion !== undefined) {
      await setupCmake(getVersion("cmake", cmakeVersion), setupCppDir)
    }

    // setup ninja
    const ninjaVersion = maybeGetInput("ninja")
    if (ninjaVersion !== undefined) {
      await setupNinja(getVersion("ninja", ninjaVersion), setupCppDir)
    }

    // setup python (required for conan, meson, gcovr, etc.)
    const pythonVersion = maybeGetInput("python")
    if (pythonVersion !== undefined) {
      await setupPython(getVersion("python", pythonVersion), arch)
    }

    // setup conan
    const conanVersion = maybeGetInput("conan")
    if (conanVersion !== undefined) {
      await setupConan(getVersion("conan", conanVersion))
    }

    // setup meson
    const mesonVersion = maybeGetInput("meson")
    if (mesonVersion !== undefined) {
      await setupMeson(getVersion("meson", mesonVersion))
    }

    // setup gcovr
    const gcovrVersion = maybeGetInput("gcovr")
    if (gcovrVersion !== undefined) {
      await setupGcovr(getVersion("gcovr", gcovrVersion))
    }

    // setup opencppCoverage
    const opencppCoverageVersion = maybeGetInput("opencppcoverage")
    if (opencppCoverageVersion !== undefined) {
      await setupOpencppcoverage(getVersion("opencppcoverage", opencppCoverageVersion))
    }

    // setup llvm
    const llvmVersion = maybeGetInput("llvm")
    if (llvmVersion !== undefined) {
      await setupLLVM(getVersion("llvm", llvmVersion), setupCppDir)
    }

    // setup chocolatey (required for installing msvc)
    const chocoVersion = maybeGetInput("choco")
    if (chocoVersion !== undefined) {
      await setupChocolatey()
    }

    // setup brew
    const brewVersion = maybeGetInput("brew")
    if (brewVersion !== undefined) {
      setupBrew()
    }

    // setup ccache
    const ccacheVersion = maybeGetInput("ccache")
    if (ccacheVersion !== undefined) {
      await setupCcache(getVersion("ccache", ccacheVersion))
    }

    // setup doxygen
    const doxygenVersion = maybeGetInput("doxygen")
    if (doxygenVersion !== undefined) {
      await setupDoxygen(getVersion("doxygen", doxygenVersion))
    }

    // setup cppCheck
    const cppCheckVersion = maybeGetInput("cppcheck")
    if (cppCheckVersion !== undefined) {
      await setupCppcheck(getVersion("cppcheck", cppCheckVersion))
    }

    // setup msvc
    const msvcVersion = maybeGetInput("msvc")
    if (msvcVersion !== undefined) {
      await setupMSVC(getVersion("msvc", msvcVersion))
    }
  } catch (err) {
    core.error(err as string | Error)
    core.setFailed("install-cpp failed")
    return 1
  }

  core.info("install-cpp succeeded")
  return 0
}

main()
  .then((ret) => {
    process.exitCode = ret
  })
  .catch((error) => {
    core.error("main() failed!")
    core.error(error as string | Error)
    process.exitCode = 1
  })
