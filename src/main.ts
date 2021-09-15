import * as core from "@actions/core"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupGcovr } from "./gcovr/gcovr"
import { setupLLVM } from "./llvm/llvm"
import { setupMeson } from "./meson/meson"
import { setupMSVC } from "./msvc/msvc"
import { setupNinja } from "./ninja/ninja"
import { setupPython } from "./python/python"

function maybeGetInput(key: string) {
  const value = core.getInput(key)
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined
}

export async function main(): Promise<number> {
  const arch = core.getInput("architecture") || process.arch
  const setupCppDir = process.env.SETUP_CPP_DIR ?? "~/setup_cpp"
  try {
    // setup cmake
    const cmakeVersion = maybeGetInput("cmake")
    if (cmakeVersion !== undefined) {
      await setupCmake(cmakeVersion, setupCppDir)
    }

    // setup ninja
    const ninjaVersion = maybeGetInput("ninja")
    if (ninjaVersion !== undefined) {
      await setupNinja(ninjaVersion, setupCppDir)
    }

    // setup python (required for conan, meson, gcovr, etc.)
    const pythonVersion = maybeGetInput("python")
    if (pythonVersion !== undefined) {
      await setupPython(pythonVersion, arch)
    }

    // setup conan
    const conanVersion = maybeGetInput("conan")
    if (conanVersion !== undefined) {
      await setupConan(conanVersion)
    }

    // setup meson
    const mesonVersion = maybeGetInput("meson")
    if (mesonVersion !== undefined) {
      await setupMeson(mesonVersion)
    }

    // setup gcovr
    const gcovrVersion = maybeGetInput("gcovr")
    if (gcovrVersion !== undefined) {
      await setupGcovr(gcovrVersion)
    }

    // setup llvm
    const llvmVersion = maybeGetInput("llvm")
    if (llvmVersion !== undefined) {
      await setupLLVM(llvmVersion, setupCppDir)
    }

    // setup chocolatey (required for installing msvc)
    const chocoVersion = maybeGetInput("choco")
    if (chocoVersion !== undefined) {
      await setupChocolatey()
    }

    // setup msvc
    const msvcVersion = maybeGetInput("msvc")
    if (msvcVersion !== undefined) {
      await setupMSVC(msvcVersion)
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
