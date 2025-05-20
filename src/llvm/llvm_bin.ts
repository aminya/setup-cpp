import { tmpdir } from "os"
import { join } from "path"
import { execRootSync } from "admina"
import { info } from "ci-log"
import memoize from "memoizee"
import { DownloaderHelper } from "node-downloader-helper"
import { installAptPack } from "setup-apt"
import { getDebArch } from "../utils/env/arch.js"
import { hasAptGet } from "../utils/env/hasAptGet.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { setupBin } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { getLLVMPackageInfo } from "./llvm_url.js"
import { majorLLVMVersion } from "./utils.js"

export async function setupLLVMBin(version: string, setupDir: string, arch: string) {
  const installInfo = await setupBin("llvm", version, getLLVMPackageInfo, setupDir, arch)
  await llvmBinaryDeps(majorLLVMVersion(version), arch)
  return installInfo
}

async function llvmBinaryDeps_(_majorVersion: number, arch: string) {
  if (hasAptGet()) {
    for (const dep of ["libtinfo5", "libtinfo6"]) {
      /* eslint-disable no-await-in-loop */
      try {
        await installAptPack([{ name: dep }])
      } catch (_err) {
        try {
          if (dep === "libtinfo5") {
            // Manually install libtinfo5 if the package is not available
            info(`Failed to install ${dep}\nManually installing the package`)

            const fileName = `libtinfo5_6.3-2ubuntu0.1_${getDebArch(arch)}.deb`
            const url = `https://launchpad.net/ubuntu/+archive/primary/+files/${fileName}`

            const dl = new DownloaderHelper(url, tmpdir(), { fileName })
            dl.on("error", async (dlErr) => {
              info(`Failed to download ${url}: ${dlErr}`)
              await dl.stop()
            })
            await dl.start()
            // Install the downloaded package via dpkg
            execRootSync("dpkg", ["-i", join(tmpdir(), fileName)])
          }
        } catch (_errFallback) {
          info(`Failed to install ${dep}. Ignoring`)
        }
      }
      /* eslint-enable no-await-in-loop */
    }
  } else if (isArch()) {
    // https://aur.archlinux.org/packages/ncurses5-compat-libs
    await setupPacmanPack("ncurses5-compat-libs", undefined, "yay")
  } else if (hasDnf()) {
    // https://packages.fedoraproject.org/pkgs/ncurses/ncurses-compat-libs/index.html
    await setupDnfPack([
      { name: "ncurses-compat-libs" },
    ])
  }
}
const llvmBinaryDeps = memoize(llvmBinaryDeps_, { promise: true })
