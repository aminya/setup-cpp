import path, { join } from "path"
import { fileURLToPath } from "url"
import * as io from "@actions/io"
import { execaSync } from "execa"
import { chmod } from "fs/promises"
import { isUrlOnline } from "is-url-online"
import { addExeExt } from "patha"
import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { getSpecificVersionAndUrl } from "../../utils/setup/version.js"
import { setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupClangFormat, setupClangTools, setupLLVM } from "../llvm.js"
import { VERSIONS, getLinuxUrl, getUrl } from "../llvm_url.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

jest.setTimeout(400000)
async function testUrl(version: string) {
  const [specificVersion, url] = await getSpecificVersionAndUrl(VERSIONS, process.platform, version, getUrl)

  if (!(await isUrlOnline(url))) {
    throw new Error(`Failed to install Version: ${version} => ${specificVersion} \n URL: ${url}`)
  }
}

describe("setup-llvm", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("llvm")
  })

  it("Finds URL for ubuntu version", async () => {
    expect(
      await getSpecificVersionAndUrl(
        VERSIONS,
        "linux",
        "13.0.0-ubuntu-16.04",
        (_plantform, version) => getLinuxUrl(version),
      ),
    ).toStrictEqual([
      "13.0.0-ubuntu-16.04",
      "https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-16.04.tar.xz",
    ])
    expect(
      await getSpecificVersionAndUrl(
        VERSIONS,
        "linux",
        "13.0.1-ubuntu-18.04",
        (_plantform, version) => getLinuxUrl(version),
      ),
    ).toStrictEqual([
      "13.0.1-ubuntu-18.04",
      "https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.1/clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-18.04.tar.xz",
    ])
    expect(
      await getSpecificVersionAndUrl(
        VERSIONS,
        "linux",
        "13.0.0-ubuntu-20.04",
        (_plantform, version) => getLinuxUrl(version),
      ),
    ).toStrictEqual([
      "13.0.0-ubuntu-20.04",
      "https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04.tar.xz",
    ])
  })

  it("Finds valid LLVM URLs", async () => {
    await Promise.all(
      [
        ...(process.platform === "darwin" ? [] : ["16.0.2", "16.0.0"]),
        "15.0.2",
        // "14.0.1",
        "14.0.0",
        "13.0.0",
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
      ].map((version) => testUrl(version)),
    )
  })

  it("should setup LLVM", async () => {
    const osVersion = await ubuntuVersion()
    const { binDir } = await setupLLVM(getVersion("llvm", "true", osVersion), directory, process.arch)
    await testBin("clang++", ["--version"], binDir)

    expect(process.env.CC?.includes("clang")).toBeTruthy()
    expect(process.env.CXX?.includes("clang++")).toBeTruthy()

    // test compilation
    const file = join(dirname, "main.cpp")
    const main_exe = join(dirname, addExeExt("main"))
    execaSync("clang++", [file, "-o", main_exe], { cwd: dirname })
    if (process.platform !== "win32") {
      await chmod(main_exe, "755")
    }
    execaSync(main_exe, { cwd: dirname, stdio: "inherit" })
  })

  it("should setup clang-format", async () => {
    const osVersion = await ubuntuVersion()
    const { binDir } = await setupClangFormat(getVersion("llvm", "true", osVersion), directory, process.arch)
    await testBin("clang-format", ["--version"], binDir)
  })

  it("should setup clang tools", async () => {
    const osVersion = await ubuntuVersion()
    const { binDir } = await setupClangTools(getVersion("llvm", "true", osVersion), directory, process.arch)
    await testBin("clang-tidy", ["--version"], binDir)
    await testBin("clang-format", ["--version"], binDir)
  })

  afterAll(async () => {
    await io.rmRF(directory)
  }, 100000)
})
