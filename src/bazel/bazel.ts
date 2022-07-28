import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { execSudo } from "../utils/exec/sudo"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupBazel(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("bazel", version)
    }
    case "darwin": {
      return setupBrewPack("bazel", version)
    }
    case "linux": {
      if (isArch()) {
        throw new Error("installing bazel on Arch linux is not supported yet")
      } else if (hasDnf()) {
        // https://bazel.build/install/redhat
        setupDnfPack("dnf-plugins-core", undefined)
        execSudo("dnf", ["copr", "enable", "vbatts/bazel"])
        return setupDnfPack("bazel4", undefined)
      } else if (isUbuntu()) {
        // https://bazel.build/install/ubuntu
        execSudo("bash", [
          "-c",
          "wget -qO - https://bazel.build/bazel-release.pub.gpg | gpg --dearmor >bazel-archive-keyring.gpg > /dev/null",
        ])
        execSudo("bash", ["-c", "mv bazel-archive-keyring.gpg /usr/share/keyrings"])
        execSudo("bash", [
          "-c",
          'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/bazel-archive-keyring.gpg] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list',
        ])
        return setupAptPack("bazel", version, [], true)
      }
      throw new Error(`Unsupported linux distribution`)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
