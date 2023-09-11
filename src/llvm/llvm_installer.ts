import { execRoot } from "admina"
import { execa } from "execa"
import { addPath } from "../utils/env/addEnv"
import { hasNala, isPackageInstalled, setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { promises } from "fs"
import { info } from "console"
import { DEFAULT_TIMEOUT } from "../installTool"
const { readFile, writeFile, chmod } = promises

export enum LLVMPackages {
  All,
  ClangFormat,
  Core,
}

export async function setupLLVMApt(
  majorVersion: number,
  packages: LLVMPackages = LLVMPackages.All,
): Promise<InstallationInfo> {
  // TODO for older versions, this also includes the minor version
  const installationFolder = `/usr/lib/llvm-${majorVersion}`

  await setupAptPack([{ name: "curl" }])
  await execa("curl", ["-LJO", "https://apt.llvm.org/llvm.sh"], { cwd: "/tmp" })
  const neededPackages = await patchAptLLVMScript("/tmp/llvm.sh", "/tmp/llvm-setup-cpp.sh", majorVersion, packages)
  await setupAptPack(neededPackages)
  await chmod("/tmp/llvm-setup-cpp.sh", "755")
  await execRoot(
    "bash",
    ["/tmp/llvm-setup-cpp.sh", `${majorVersion}`, ...(packages === LLVMPackages.All ? ["all"] : [])],
    {
      stdio: "inherit",
      shell: true,
      timeout: DEFAULT_TIMEOUT,
    },
  )

  await addPath(`${installationFolder}/bin`)

  return {
    installDir: `${installationFolder}`,
    binDir: `${installationFolder}/bin`,
    bin: `${installationFolder}/bin/clang++`,
  }
}

async function patchAptLLVMScript(path: string, target_path: string, majorVersion: number, packages: LLVMPackages) {
  let script = await readFile(path, "utf-8")

  script = debugScript(script)
  script = nonInteractiveScript(script)
  script = choosePackages(packages, script, majorVersion)
  script = await removeConflictingPackages(script)
  script = useNalaScript(script)

  await writeFile(target_path, script)

  // the packages needed by the script
  return [{ name: "lsb-release" }, { name: "wget" }, { name: "software-properties-common" }, { name: "gnupg" }]
}

function debugScript(script: string) {
  if (!process.env.NODE_DEBUG) {
    return script.replace(/set -eux/g, "set -eu")
  }
  return script
}

function nonInteractiveScript(script: string) {
  // make the scirpt non-interactive and fix broken packages
  return script.replace(
    /add-apt-repository "\${REPO_NAME}"/g,
    // eslint-disable-next-line no-template-curly-in-string
    'add-apt-repository -y "${REPO_NAME}"',
  )
}

async function removeConflictingPackages(givenScript: string) {
  // fix conflicts between libclang-rt and libclang
  let script = givenScript.replace(
    /apt-get install -y/g,
    'apt-get install -o Dpkg::Options::="--force-overwrite" -y --fix-broken',
  )

  // check if these are installed and if so, remove them from the script as they conflict
  const conflictingPackages = ["libc++-$LLVM_VERSION-dev", "libc++abi-$LLVM_VERSION-dev", "libunwind-$LLVM_VERSION-dev"]
  await Promise.all(
    conflictingPackages.map(async (pack) => {
      const installingPack = pack.replace("$LLVM_VERSION", "*")
      if (await isPackageInstalled(installingPack)) {
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
