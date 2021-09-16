import { setupLLVM, VERSIONS, getUrl } from "../llvm"
import { getSpecificVersionAndUrl } from "../../utils/setup/version"
import { isValidUrl } from "../../utils/http/validate_url"
import { setupTmpDir, cleanupTmpDir } from "../../utils/tests/test-helpers"
import { addBinExtension } from "../../utils/setup/setupBin"
import { join } from "path"
import { spawnSync as spawn } from "child_process"
import { which } from "@actions/io"

jest.setTimeout(200000)
async function testUrl(version: string) {
  const [specificVersion, url] = await getSpecificVersionAndUrl(VERSIONS, process.platform, version, getUrl)

  if (!(await isValidUrl(url))) {
    throw new Error(`Failed to install Version: ${version} => ${specificVersion} \n URL: ${url}`)
  }
}

describe("setup-llvm", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("setup-llvm")
  })

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

  it("should setup LLVM", async () => {
    const { binDir } = await setupLLVM("12.0.0", directory)
    expect(binDir).toBeDefined()
    expect(binDir).not.toHaveLength(0)

    const clangBin = join(binDir, addBinExtension("clang"))

    const { status } = spawn(clangBin, ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)

    expect(await which("clang", true)).toBe(clangBin)
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-llvm")
  }, 100000)
})
