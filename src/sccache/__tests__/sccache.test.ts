import { getUbuntuVersion } from "ubuntu-version"
import { isUbuntu } from "../../utils/env/isUbuntu.js"
import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupSccache } from "../sccache.js"

jest.setTimeout(300000)
describe("setup-sccache", () => {
  it("should setup sccache", async () => {
    const ubuntuVersion = isUbuntu() ? await getUbuntuVersion() : undefined
    const ubuntuVersionMajor = ubuntuVersion?.[0] ?? 0
    if (process.platform === "linux" && process.arch === "arm64" && ubuntuVersionMajor < 24) {
      return
    }

    const installInfo = await setupSccache({ version: "", setupDir: "", arch: process.arch })

    await testBin("sccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
