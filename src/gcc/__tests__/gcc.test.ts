import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"
import { getVersion } from "../../versions/versions"
import { join, addExeExt } from "patha"
import execa from "execa"
import { chmodSync } from "fs"
import { ubuntuVersion } from "../../utils/env/ubuntu_version"

jest.setTimeout(3000000)
describe("setup-gcc", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("gcc")
  })

  it("should setup gcc", async () => {
    const version = getVersion("gcc", undefined, await ubuntuVersion())
    const installInfo = await setupGcc(version, directory, process.arch)

    let gpp = "g++"
    if (process.platform !== "win32") {
      gpp = `g++-${version}`
    }
    await testBin(gpp, ["--version"], installInfo?.binDir)

    expect(process.env.CC?.includes("gcc")).toBeTruthy()
    expect(process.env.CXX?.includes("g++")).toBeTruthy()

    // test compilation
    const file = join(__dirname, "main.cpp")
    const main_exe = join(__dirname, addExeExt("main"))
    execa.sync("g++", [file, "-o", main_exe], { cwd: __dirname })
    if (process.platform !== "win32") {
      chmodSync(main_exe, "755")
    }
    execa.sync(main_exe, { cwd: __dirname, stdio: "inherit" })
  })

  afterAll(async () => {
    await cleanupTmpDir("gcc")
  }, 100000)
})
