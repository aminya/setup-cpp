import { join, addExeExt } from "patha"
import { delimiter } from "path"
import { InstallationInfo, setupBin } from "../utils/setup/setupBin"
import { semverCoerceIfInvalid } from "../utils/setup/version"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import { addEnv } from "../utils/env/addEnv"
import { hasNala, setupAptPack, updateAptAlternatives } from "../utils/setup/setupAptPack"
import { info, warning } from "ci-log"

import { GITHUB_ACTIONS } from "ci-info"
import { setupGcc } from "../gcc/gcc"
import { getVersion } from "../versions/versions"
import { isUbuntu } from "../utils/env/isUbuntu"
import { getLLVMPackageInfo } from "./llvm_url"
import { ubuntuVersion } from "../utils/env/ubuntu_version"
import { pathExists } from "path-exists"
import { ExecaReturnValue, execa } from "execa"
import { readFileSync, writeFileSync } from "fs"
import { execRootSync } from "admina"

export async function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installationInfo = await setupLLVMWithoutActivation(version, setupDir, arch)
  await activateLLVM(installationInfo.installDir ?? setupDir, version)
  return installationInfo
}

let installedDeps = false

async function setupLLVMOnly(version: string, setupDir: string, arch: string) {
  try {
    if (isUbuntu()) {
      const coeredVersion = semverCoerceIfInvalid(version)
      const majorVersion = parseInt(coeredVersion.split(".")[0], 10)
      const installationFolder = `/usr/lib/llvm-${majorVersion}` // TODO for older versions, this also includes the minor version

      await setupAptPack([{ name: "curl" }])
      await execa("curl", ["-LJO", "https://apt.llvm.org/llvm.sh"], { cwd: "/tmp" })

      let script = readFileSync("/tmp/llvm.sh", "utf-8")
      // make the scirpt non-interactive and fix broken packages
      script = script
        .replace(
          /add-apt-repository "\${REPO_NAME}"/g,
          // eslint-disable-next-line no-template-curly-in-string
          'add-apt-repository -y "${REPO_NAME}"'
        )
        .replace(/apt-get install -y/g, "apt-get install -y --fix-broken")
      // use nala if it is available
      if (hasNala()) {
        script = script.replace(/apt-get/g, "nala")
      }
      writeFileSync("/tmp/llvm-setup-cpp.sh", script)

      execRootSync("chmod", ["+x", "/tmp/llvm-setup-cpp.sh"])
      execRootSync("bash", ["/tmp/setup-cpp-llvm.sh"], {
        stdio: "inherit",
        shell: true,
      })

      return {
        installDir: `/usr/lib/${installationFolder}`,
        binDir: `/usr/bin`,
        version,
      } as InstallationInfo
    }
  } catch (err) {
    info(`Failed to install llvm via system package manager ${err}`)
  }

  return setupBin("llvm", version, getLLVMPackageInfo, setupDir, arch)
}

async function setupLLVMWithoutActivation(version: string, setupDir: string, arch: string) {
  const installationInfoPromise = setupLLVMOnly(version, setupDir, arch)

  let depsPromise: Promise<void> = Promise.resolve()
  if (!installedDeps) {
    depsPromise = setupLLVMDeps(arch, version)
    // eslint-disable-next-line require-atomic-updates
    installedDeps = true
  }

  // install LLVM and its dependencies in parallel
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [installationInfo, _] = await Promise.all([installationInfoPromise, depsPromise])

  return installationInfo
}

async function setupLLVMDeps(arch: string, version: string) {
  if (process.platform === "linux") {
    // install llvm build dependencies
    await setupGcc(getVersion("gcc", undefined, await ubuntuVersion()), "", arch) // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first

    if (isUbuntu()) {
      const majorVersion = parseInt(version.split(".")[0], 10)
      if (majorVersion <= 10) {
        await setupAptPack([{ name: "libtinfo5" }])
      } else {
        await setupAptPack([{ name: "libtinfo-dev" }])
      }
    }
    // TODO: install libtinfo on other distros
    // await setupPacmanPack("ncurses")
  }
}

export async function activateLLVM(directory: string, versionGiven: string) {
  const _version = semverCoerceIfInvalid(versionGiven)

  const lib = join(directory, "lib")

  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  const promises: Promise<void | ExecaReturnValue<string>>[] = [
    // the output of this action
    addEnv("LLVM_PATH", directory),

    // Setup LLVM as the compiler
    addEnv("LD_LIBRARY_PATH", `${lib}${delimiter}${ld}`),
    addEnv("DYLD_LIBRARY_PATH", `${lib}${delimiter}${dyld}`),

    // compiler flags
    addEnv("LDFLAGS", `-L"${directory}/lib"`),
    addEnv("CPPFLAGS", `-I"${directory}/include"`),

    // compiler paths
    addEnv("CC", addExeExt(`${directory}/bin/clang`)),
    addEnv("CXX", addExeExt(`${directory}/bin/clang++`)),

    addEnv("LIBRARY_PATH", `${directory}/lib`),

    // os sdks
    setupMacOSSDK(),
  ]

  // TODO Causes issues with clangd
  // TODO Windows builds fail with llvm's CPATH
  // if (process.platform !== "win32") {
  //   const llvmMajor = semverMajor(version)
  //   if (await pathExists(`${directory}/lib/clang/${version}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${version}/include`))
  //   } else if (await pathExists(`${directory}/lib/clang/${llvmMajor}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${llvmMajor}/include`))
  //   }
  // }

  if (isUbuntu()) {
    promises.push(
      updateAptAlternatives("cc", `${directory}/bin/clang`),
      updateAptAlternatives("cxx", `${directory}/bin/clang++`),
      updateAptAlternatives("clang", `${directory}/bin/clang`),
      updateAptAlternatives("clang++", `${directory}/bin/clang++`),
      updateAptAlternatives("lld", `${directory}/bin/lld`),
      updateAptAlternatives("ld.lld", `${directory}/bin/ld.lld`),
      updateAptAlternatives("llvm-ar", `${directory}/bin/llvm-ar`)
    )
  }

  if (GITHUB_ACTIONS) {
    await addLLVMLoggingMatcher()
  }

  await Promise.all(promises)
}

/** Setup llvm tools (clang tidy, clang format, etc) without activating llvm and using it as the compiler */
export async function setupClangTools(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  if (GITHUB_ACTIONS) {
    await addLLVMLoggingMatcher()
  }
  return setupLLVMWithoutActivation(version, setupDir, arch)
}

async function addLLVMLoggingMatcher() {
  const matcherPath = join(__dirname, "llvm_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the llvm_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
