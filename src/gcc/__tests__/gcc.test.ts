import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"
import { getVersion } from "../../default_versions"
import path from "path"
import execa from "execa"
import { addBinExtension } from "../../utils/extension/extension"
import { chmodSync } from "fs"

jest.setTimeout(3000000)
describe("setup-gcc", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("doxygen")
  })

  it("should setup gcc", async () => {
    const version = getVersion("gcc", undefined)
    const installInfo = await setupGcc(version, directory, process.arch)

    let gpp = "g++"
    if (process.platform !== "win32") {
      gpp = `g++-${version}`
    }
    await testBin(gpp, ["--version"], installInfo?.binDir)

    expect(process.env.CC?.includes("gcc")).toBeTruthy()
    expect(process.env.CXX?.includes("g++")).toBeTruthy()

    // test compilation
    const file = path.join(__dirname, "main.cpp")
    const main_exe = path.join(__dirname, addBinExtension("main"))
    execa.sync("g++", [file, "-o", main_exe], { cwd: __dirname })
    if (process.platform !== "win32") {
      chmodSync(main_exe, "755")
    }
    execa.sync(main_exe, { cwd: __dirname, stdio: "inherit" })
  })

  afterAll(async () => {
    await cleanupTmpDir("doxygen")
  }, 100000)
})
