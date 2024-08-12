import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { setupVcpkg } from "../vcpkg"

jest.setTimeout(300000)

describe("setup-vcpkg", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("vcpkg")
  })

  it("should setup vcpkg", async () => {
    console.log(!("true" in ["", "true"]))
    const { binDir } = await setupVcpkg("", directory, "")
    await testBin("vcpkg", ["--version"], binDir)
    return binDir
  })

  it("should setup vcpkg with specific version", async () => {
    const { binDir } = await setupVcpkg("e590c2b30c08caf1dd8d612ec602a003f9784b7d", directory, "")
    await testBin("vcpkg", ["--version"], binDir)
    return binDir
  })

  afterEach(async () => {
    await cleanupTmpDir(directory)
  })
})
