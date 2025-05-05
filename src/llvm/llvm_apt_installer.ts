import { info } from "console"
import { tmpdir } from "os"
import path, { join } from "path"
import { fileURLToPath } from "url"
import { execRoot, execRootSync } from "admina"
import { addPath } from "envosman"
import { chmod, readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import { aptTimeout, hasNala, installAddAptRepo, installAptPack, isAptPackRegexInstalled } from "setup-apt"
import { DEFAULT_TIMEOUT } from "../installTool.js"
import { rcOptions } from "../options.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { majorLLVMVersion } from "./utils.js"
const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export enum LLVMPackages {
  All = 0,
  ClangFormat = 1,
  Core = 2,
}

/**
 * Try to setup LLVM via the apt package manager
 *
 * @param {string} version - The version of LLVM to install
 * @param {LLVMPackages} packages - The packages to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 * @returns {undefined} If the installation fails, it will try to remove the repository and will return undefined
 */
export async function trySetupLLVMApt(
  version: string,
  packages: LLVMPackages = LLVMPackages.All,
): Promise<InstallationInfo | undefined> {
  if (!isUbuntu()) {
    return undefined
  }

  try {
    return await setupLLVMApt(version, packages)
  } catch (err) {
    info(`Failed to install llvm via system package manager ${err}. Trying to remove the repository`)
    try {
      execRootSync(join(dirname, "llvm_repo_remove.bash"), [`${majorLLVMVersion(version)}`])
    } catch (removeErr) {
      info(`Failed to remove llvm repository ${removeErr}`)
    }
  }
  return undefined
}

/**
 * Setup LLVM via the apt package manager
 *
 * @note assumes this is running on an Ubuntu/Debian system
 *
 * @param {string} version - The version of LLVM to install
 * @param {LLVMPackages} packages - The packages to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 */
export async function setupLLVMApt(
  version: string,
  packages: LLVMPackages = LLVMPackages.All,
): Promise<InstallationInfo> {
  const majorVersion = majorLLVMVersion(version)

  // TODO for older versions, this also includes the minor version
  const installationFolder = `/usr/lib/llvm-${majorVersion}`

  // download the installation script
  await installAptPack([{ name: "ca-certificates" }])
  const dl = new DownloaderHelper("https://apt.llvm.org/llvm.sh", tmpdir(), { fileName: "llvm.sh" })
  dl.on("error", (err) => {
    throw new Error(`Failed to download the LLVM installer script: ${err}`)
  })
  await dl.start()
  const installerScript = await readFile(dl.getDownloadPath(), "utf-8")

  const installerPath = join(tmpdir(), "llvm-setup-cpp.sh")
  await patchAptLLVMScript(
    installerScript,
    installerPath,
    majorVersion,
    packages,
  )
  await installAddAptRepo()
  await installAptPack([{ name: "lsb-release" }, { name: "wget" }, { name: "gnupg" }])
  await chmod(installerPath, "755")
  await execRoot(
    "bash",
    [installerPath, `${majorVersion}`, ...(packages === LLVMPackages.All ? ["all"] : [])],
    {
      stdio: "inherit",
      shell: true,
      timeout: DEFAULT_TIMEOUT,
    },
  )

  await addPath(`${installationFolder}/bin`, rcOptions)

  return {
    installDir: `${installationFolder}`,
    binDir: `${installationFolder}/bin`,
    bin: `${installationFolder}/bin/clang++`,
  }
}

async function patchAptLLVMScript(
  givenScript: string,
  target_path: string,
  majorVersion: number,
  packages: LLVMPackages,
) {
  let script = debugScript(givenScript)
  script = nonInteractiveScript(script)
  script = choosePackages(packages, script, majorVersion)
  script = await removeConflictingPackages(script)
  script = useNalaScript(script)

  await writeFile(target_path, script)
}

function debugScript(script: string) {
  if (process.env.NODE_DEBUG !== "1" && process.env.NODE_DEBUG !== "true") {
    return script.replace(/set -eux/g, "set -eu")
  }
  return script
}

function nonInteractiveScript(script: string) {
  // make the scirpt non-interactive and fix broken packages
  return script.replace(
    /add-apt-repository\s*(-y)?\s*"\${REPO_NAME}"/g,
    `add-apt-repository -y "\${REPO_NAME}"
apt-get update -o ${aptTimeout}`,
  )
}

async function removeConflictingPackages(givenScript: string) {
  // fix conflicts between libclang-rt and libclang
  let script = givenScript.replace(
    /apt-get install -y/g,
    `apt-get install -o Dpkg::Options::="--force-overwrite" -o ${aptTimeout}  -y --fix-broken`,
  )

  // check if these are installed and if so, remove them from the script as they conflict
  const conflictingPackages = ["libc++-$LLVM_VERSION-dev", "libc++abi-$LLVM_VERSION-dev", "libunwind-$LLVM_VERSION-dev"]
  await Promise.all(
    conflictingPackages.map(async (pack) => {
      const installingPack = pack.replace("$LLVM_VERSION", "*")
      if (await isAptPackRegexInstalled(installingPack)) {
        info(`Removing conflicting package ${installingPack}`)
        script = script.replace(pack, "")
      }
    }),
  )
  return script
}

function useNalaScript(script: string) {
  // use nala if it is available
  if (hasNala()) {
    return script.replace(/apt-get/g, "nala")
  }
  return script
}

function choosePackages(packages: LLVMPackages, script: string, majorVersion: number) {
  if (packages === LLVMPackages.ClangFormat) {
    return script.replace(/ -y \$PKG/g, ` -y clang-format-${majorVersion}`)
  }
  return script
}
