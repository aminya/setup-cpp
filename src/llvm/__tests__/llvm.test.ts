import { getSpecificVersionAndUrl } from "../llvm"
import { isValidUrl } from "../../utils/http/validate_url"

jest.setTimeout(100000)

async function testUrl(version: string) {
  const [specificVersion, url] = await getSpecificVersionAndUrl(process.platform, version)

  if (!(await isValidUrl(url))) {
    throw new Error(`Failed to install Version: ${version} => ${specificVersion} \n URL: ${url}`)
  }
}

describe("setup-llvm", () => {
  it("Finds valid LLVM URLs", async () => {
    await Promise.all(
      [
        "12.0.0",
        "12",
        "11",
        "11.0.0",
        "10",
        "10.0.0",
        "9.0.0",
        "8",
        "8.0.0",
        "7.0.0",
        "7",
        "6",
        "6.0.0",
        "5",
        "5.0.0",
        "4",
      ].map((version) => testUrl(version))
    )
  })
})
