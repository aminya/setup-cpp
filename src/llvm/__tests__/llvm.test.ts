import { setupLLVM, VERSIONS, getUrl, setupClangTools } from "../llvm"
import { getSpecificVersionAndUrl } from "../../utils/setup/version"
import { isValidUrl } from "../../utils/http/validate_url"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { isGitHubCI } from "../../utils/env/isci"

jest.setTimeout(300000)
async function testUrl(version: string) {
  const [specificVersion, url] = await getSpecificVersionAndUrl(VERSIONS, process.platform, version, getUrl)

  if (!(await isValidUrl(url))) {
    throw new Error(`Failed to install Version: ${version} => ${specificVersion} \n URL: ${url}`)
  }
}

describe("setup-llvm", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("llvm")
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
    const { binDir } = await setupLLVM("11.0.0", directory, process.arch)
    await testBin("clang++", ["--version"], binDir)

    expect(process.env.CC?.includes("clang")).toBeTruthy()
    expect(process.env.CXX?.includes("clang++")).toBeTruthy()
  })

  it("should find llvm in the cache", async () => {
    const { binDir } = await setupLLVM("11.0.0", directory, process.arch)
    await testBin("clang++", ["--version"], binDir)

    if (isGitHubCI()) {
      expect(binDir).toMatch("hostedtoolcache")
    }

    expect(process.env.CC?.includes("clang")).toBeTruthy()
    expect(process.env.CXX?.includes("clang++")).toBeTruthy()

    if (isGitHubCI()) {
      expect(process.env.CC).toMatch("hostedtoolcache")
      expect(process.env.CXX).toMatch("hostedtoolcache")
    }
  })

  it("should setup clang-tidy and clang-format", async () => {
    const { binDir } = await setupClangTools("11.0.0", directory, process.arch)
    await testBin("clang-tidy", ["--version"], binDir)
    await testBin("clang-format", ["--version"], binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("llvm")
  }, 100000)
})
