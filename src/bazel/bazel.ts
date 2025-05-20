import { execRoot } from "admina"
import { hasApk, installApkPack } from "setup-alpine"
import { addAptKeyViaURL, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { getDebArch } from "../utils/env/arch.js"
import { hasAptGet } from "../utils/env/hasAptGet.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
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
        await execRoot("dnf", ["copr", "enable", "vbatts/bazel"])
        return setupDnfPack([{ name: "bazel4" }])
      } else if (hasAptGet()) {
        // https://bazel.build/install/ubuntu
        const keyFileName = await addAptKeyViaURL({
          fileName: "bazel-archive-keyring.gpg",
          keyUrl: "https://bazel.build/bazel-release.pub.gpg",
        })
        await execRoot("bash", [
          "-c",
          `echo "deb [arch=${
            getDebArch(process.arch)
          } signed-by=${keyFileName}] https://storage.googleapis.com/bazel-apt stable jdk1.8" | tee /etc/apt/sources.list.d/bazel.list`,
        ])
        return installAptPack([{ name: "bazel", version }], true)
      } else if (await hasApk()) {
        return installApkPack([{ name: "bazel", version }], true)
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
