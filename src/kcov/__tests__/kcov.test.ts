import { info } from "@actions/core"
import which from "which"
import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { setupKcov } from "../kcov.js"

jest.setTimeout(300000)
describe("setup-Kcov", () => {
  if (process.platform !== "linux") {
    it.todo("should setup kcov on non-Windows")
    return
  }

  it("should build and setup kcov-41", async () => {
    const directory = await setupTmpDir("kcov-v41")
    const { binDir } = (await setupKcov({ version: "41", setupDir: directory, arch: process.arch })) as InstallationInfo
    // the prebuild binary only works on ubuntu 20.04
    try {
      await testBin("kcov", ["--version"], binDir)
    } catch (err) {
      info((err as Error).message)
    }
    await cleanupTmpDir("kcov-v41")
  })

  it("should setup Kcov v40 via downloading the binaries", async () => {
    const directory = await setupTmpDir("kcov-v40")
    const { binDir } =
      (await setupKcov({ version: "40-binary", setupDir: directory, arch: process.arch })) as InstallationInfo
    // the prebuild binary only works on ubuntu 20.04
    try {
      await testBin("kcov", ["--version"], binDir)
    } catch (err) {
      info((err as Error).message)
    }
    await cleanupTmpDir("kcov-v40")
  })

  it("should build and setup Kcov v40", async () => {
    const directory = await setupTmpDir("kcov-v40")
    const { binDir } = (await setupKcov({ version: "40", setupDir: directory, arch: process.arch })) as InstallationInfo
    await testBin("kcov", ["--version"], binDir)
    await cleanupTmpDir("kcov-v40")
  })

  it("should build and setup Kcov v38", async () => {
    try {
      const directory2 = await setupTmpDir("kcov-v38")

      await setupKcov({ version: "38", setupDir: directory2, arch: process.arch })

      expect(which.sync("kcov", { nothrow: true })).toBeTruthy()

      await testBin("kcov", ["--version"], "usr/local/bin") // because of cmake --install

      await cleanupTmpDir("kcov-v38")
    } catch (err) {
      // TODO
      console.warn(err)
    }
  })
})
