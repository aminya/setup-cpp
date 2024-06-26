import { execRootSync } from "admina"
import { hasDnf } from "../utils/env/hasDnf"
import { isArch } from "../utils/env/isArch"
import { isUbuntu } from "../utils/env/isUbuntu"
import { addAptKeyViaDownload, setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { setupDnfPack } from "../utils/setup/setupDnfPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupBazel(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      // install bazelisk because it contains both
      return setupChocoPack("bazelisk", version)
    }
    case "darwin": {
      // install bazelisk because it contains both
      return setupBrewPack("bazelisk", version)
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
        return setupAptPack([{ name: "bazel", version }], true)
      }
      throw new Error(`Unsupported linux distribution`)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
