import { setupVcpkg } from "../vcpkg"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
async function testvcpkg() {
  const { binDir } = await setupVcpkg("", "", "")
  await testBin("vcpkg", ["--version"], binDir)
  return binDir
}

describe("setup-vcpkg", () => {
  it("should setup vcpkg", async () => {
    await testvcpkg()
  })
})
