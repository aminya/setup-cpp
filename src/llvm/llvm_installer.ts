import { info } from "console"
import { tmpdir } from "os"
import { join } from "path"
import { execRoot } from "admina"
import { addPath } from "envosman"
import { chmod, readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import { aptTimeout, hasNala, installAptPack, isAptPackRegexInstalled } from "setup-apt"
import { rcOptions } from "../cli-options.js"
import { DEFAULT_TIMEOUT } from "../installTool.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"

export enum LLVMPackages {
  All = 0,
  ClangFormat = 1,
  Core = 2,
}

export async function setupLLVMApt(
  majorVersion: number,
  packages: LLVMPackages = LLVMPackages.All,
): Promise<InstallationInfo> {
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
  const neededPackages = await patchAptLLVMScript(
    installerScript,
    installerPath,
    majorVersion,
    packages,
  )
  await installAptPack(neededPackages)
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

  // the packages needed by the script
  return [{ name: "lsb-release" }, { name: "wget" }, { name: "software-properties-common" }, { name: "gnupg" }]
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
    `add-apt-repository -y -n "\${REPO_NAME}"
apt-get update -o ${aptTimeout} -y`,
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
