import { setupVcpkg } from "../vcpkg"
import { testBin, setupTmpDir } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
async function testvcpkg(directory: string) {
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
    await testvcpkg(directory)
  })
})
