import path, { join } from "path"
import { fileURLToPath } from "url"
import * as io from "@actions/io"
import { execa } from "execa"
import { chmod } from "fs/promises"
import { addExeExt } from "patha"
import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupClangFormat, setupClangTools, setupLLVM } from "../llvm.js"
import { getLLVMAssetURL } from "../llvm_url.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

jest.setTimeout(400000)

describe("setup-llvm", () => {
  it("Finds URL for ubuntu version", async () => {
    expect(
      await getLLVMAssetURL("linux", "x86_64", "13.0.0"),
    ).toStrictEqual(
      "https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04.tar.xz",
    )
    expect(
      await getLLVMAssetURL("linux", "x86_64", "13.0.1"),
    ).toStrictEqual(
      "https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.1/clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-18.04.tar.xz",
    )
  })

  it("Finds valid LLVM URLs", async () => {
    await Promise.all(
      [
        "20",
        "19",
        "18",
        "17",
        "16",
        "15",
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
      ].map((version) => getLLVMAssetURL("win32", "x64", version)),
    )
  })

  it("should setup latest LLVM", async () => {
    const directory = await setupTmpDir("llvm")

    const osVersion = await ubuntuVersion()
    {
      const { binDir } = await setupLLVM({
        version: getVersion("llvm", "true", osVersion),
        setupDir: directory,
        arch: process.arch,
      })
      await testBin("clang++", ["--version"], binDir)

      expect(process.env.CC?.includes("clang")).toBeTruthy()
      expect(process.env.CXX?.includes("clang++")).toBeTruthy()

      // test compilation
      const file = join(dirname, "main.cpp")
      const main_exe = join(dirname, addExeExt("main"))
      await execa("clang++", [file, "-o", main_exe], { cwd: dirname })
      if (process.platform !== "win32") {
        await chmod(main_exe, "755")
      }
      await execa(main_exe, { cwd: dirname, stdio: "inherit" })
    }

    {
      const { binDir } = await setupClangFormat({
        version: getVersion("llvm", "true", osVersion),
        setupDir: directory,
        arch: process.arch,
      })
      await testBin("clang-format", ["--version"], binDir)
    }

    {
      const { binDir } = await setupClangTools({
        version: getVersion("llvm", "true", osVersion),
        setupDir: directory,
        arch: process.arch,
      })
      await testBin("clang-tidy", ["--version"], binDir)
      await testBin("clang-format", ["--version"], binDir)
    }

    await io.rmRF(directory)
  })

  it("should setup LLVM 5 from llvm.org", async () => {
    const directory = await setupTmpDir("llvm")

    const { binDir } = await setupLLVM({ version: "5", setupDir: directory, arch: process.arch })
    await testBin("clang++", ["--version"], binDir)

    expect(process.env.CC?.includes("clang")).toBeTruthy()
    expect(process.env.CXX?.includes("clang++")).toBeTruthy()

    if (process.platform === "linux") {
      // test compilation
      // the old clang doesn't work inside GitHub actions for other than linux due to system libraries and SDKs

      const file = join(dirname, "main.cpp")
      const main_exe = join(dirname, addExeExt("main"))
      await execa("clang++", ["-std=c++17", file, "-o", main_exe], { cwd: dirname })
      await chmod(main_exe, "755")
      await execa(main_exe, { cwd: dirname, stdio: "inherit" })
    }

    await io.rmRF(directory)
  })

  // test installation of LLVM 10 to 19 on Linux
  for (let version = 10; version <= 19; version++) {
    if (process.platform !== "linux") {
      continue
    }
    it(`should setup LLVM ${version} on Linux`, async () => {
      const directory = await setupTmpDir("llvm")

      const { binDir } = await setupLLVM({ version: `${version}`, setupDir: directory, arch: process.arch })
      await testBin("clang++", ["--version"], binDir)

      expect(process.env.CC?.includes("clang")).toBeTruthy()
      expect(process.env.CXX?.includes("clang++")).toBeTruthy()

      await io.rmRF(directory)
    })
  }
})
