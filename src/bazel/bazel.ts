import { execRootSync } from "admina"
import { addAptKeyViaDownload, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupBazel(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      // install bazelisk because it contains both
      return setupChocoPack("bazelisk", version)
    }
    case "darwin": {
      // install bazelisk because it contains both
      return installBrewPack("bazelisk", version)
    }
    case "linux": {
      if (isArch()) {
        throw new Error("installing bazel on Arch linux is not supported yet")
      } else if (hasDnf()) {
        // https://bazel.build/install/redhat
        await setupDnfPack([{ name: "dnf-plugins-core" }])
        execRootSync("dnf", ["copr", "enable", "vbatts/bazel"])
        return setupDnfPack([{ name: "bazel4" }])
      } else if (isUbuntu()) {
        // https://bazel.build/install/ubuntu
        const keyFileName = await addAptKeyViaDownload(
          "bazel-archive-keyring.gpg",
          "https://bazel.build/bazel-release.pub.gpg",
        )
        execRootSync("bash", [
          "-c",
          `echo "deb [arch=amd64 signed-by=${keyFileName}] https://storage.googleapis.com/bazel-apt stable jdk1.8" | tee /etc/apt/sources.list.d/bazel.list`,
        ])
        return installAptPack([{ name: "bazel", version }], true)
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
