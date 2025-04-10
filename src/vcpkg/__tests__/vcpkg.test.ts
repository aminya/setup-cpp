import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { setupVcpkg } from "../vcpkg.js"

jest.setTimeout(300000)

describe("setup-vcpkg", () => {
  let directory: string
  beforeEach(async () => {
    // TODO setup-vcpkg bootstrap fails on Linux arm64 with spaces in the path
    const noSpaces = process.platform === "linux" && process.arch === "arm64"
    directory = await setupTmpDir("vcpkg", !noSpaces)
  })

  it("should setup vcpkg", async () => {
    console.log(!("true" in ["", "true"]))
    const { binDir } = await setupVcpkg({ version: "", setupDir: directory, arch: process.arch })
    await testBin("vcpkg", ["--version"], binDir)
    return binDir
  })

  it("should setup vcpkg with specific version", async () => {
    const { binDir } = await setupVcpkg({
      version: "e590c2b30c08caf1dd8d612ec602a003f9784b7d",
      setupDir: directory,
      arch: process.arch,
    })
    await testBin("vcpkg", ["--version"], binDir)
    return binDir
  })

  afterEach(async () => {
    await cleanupTmpDir(directory)
  })
})
