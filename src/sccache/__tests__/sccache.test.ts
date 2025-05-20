import { getUbuntuVersion } from "ubuntu-version"
import { hasAptGet } from "../../utils/env/hasAptGet.js"
import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupSccache } from "../sccache.js"

jest.setTimeout(300000)
describe("setup-sccache", () => {
  it("should setup sccache", async () => {
    const ubuntuVersion = hasAptGet() ? await getUbuntuVersion() : undefined
    const ubuntuVersionMajor = ubuntuVersion?.[0] ?? 0
    if (process.platform === "linux" && process.arch === "arm64" && ubuntuVersionMajor < 24) {
      return
    }

    const installInfo = await setupSccache("", "", process.arch)

    await testBin("sccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
