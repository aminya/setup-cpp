import { setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { setupVcpkg } from "../vcpkg"

jest.setTimeout(300000)
async function testVcpkg(directory: string) {
  const { binDir } = await setupVcpkg("", directory, "")
  await testBin("vcpkg", ["--version"], binDir)
  return binDir
}

describe("setup-vcpkg", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("vcpkg")
  })

  it("should setup vcpkg", async () => {
    await testVcpkg(directory)
  })
})
