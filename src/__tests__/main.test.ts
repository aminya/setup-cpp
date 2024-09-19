import { parseArgs } from "../cli-options.js"
import { getCompilerInfo } from "../compilers.js"
import { type Inputs, llvmTools } from "../tool.js"
import { DefaultUbuntuVersion, DefaultVersions } from "../versions/default_versions.js"
import { getVersion, syncVersions } from "../versions/versions.js"

jest.setTimeout(300000)
describe("getCompilerInfo", () => {
  it("version will be undefined if not provided", () => {
    const { compiler, version } = getCompilerInfo("llvm")
    expect(compiler).toBe("llvm")
    expect(version).toBeUndefined()
  })

  it("extracts version", () => {
    const { compiler, version } = getCompilerInfo("llvm-12.0.0")
    expect(compiler).toBe("llvm")
    expect(version).toBe("12.0.0")
  })

  it("finds a version even if not semver", () => {
    const { compiler, version } = getCompilerInfo("llvm-12")
    expect(compiler).toBe("llvm")
    expect(version).toBe("12")
  })
})

describe("getCompilerInfo", () => {
  it("getCompilerInfo with semver", () => {
    const { compiler, version } = getCompilerInfo("llvm-12.0.0")
    expect(compiler).toBe("llvm")
    expect(version).toBe("12.0.0")
  })

  it("getCompilerInfo with major version", () => {
    const { compiler, version } = getCompilerInfo("llvm-12")
    expect(compiler).toBe("llvm")
    expect(version).toBe("12")
  })

  it("getCompilerInfo without version", () => {
    const { compiler, version } = getCompilerInfo("llvm")
    expect(compiler).toBe("llvm")
    expect(version).toBeUndefined()
  })
})

describe("syncVersion", () => {
  it("Syncs llvm tools versions", () => {
    expect(syncVersions(parseArgs(["--llvm", "14.0.0", "--clangtidy", "true"]), llvmTools as Inputs[])).toBe(true)
    expect(syncVersions(parseArgs(["--llvm", "13.0.0", "--clangtidy", "true"]), llvmTools as Inputs[])).toBe(true)
    expect(syncVersions(parseArgs(["--compiler", "llvm-13.0.0", "--clangtidy", "true"]), llvmTools as Inputs[])).toBe(
      true,
    )
    expect(syncVersions(parseArgs(["--llvm", "13.0.0", "--clangtidy", "12.0.0"]), llvmTools as Inputs[])).toBe(false)

    const opts1 = parseArgs(["--llvm", "14.0.0", "--clangtidy", "true"])
    expect(syncVersions(opts1, llvmTools as Inputs[])).toBe(true)
    expect(opts1.llvm).toBe("14.0.0")
    expect(opts1.clangtidy).toBe("14.0.0")
    expect(opts1.clangformat).toBe(undefined)

    const opts2 = parseArgs(["--clangtidy", "15.0.0", "--clangformat", "true"])
    expect(syncVersions(opts2, llvmTools as Inputs[])).toBe(true)
    expect(opts2.llvm).toBe(undefined)
    expect(opts2.clangtidy).toBe("15.0.0")
    expect(opts2.clangformat).toBe("15.0.0")

    const opts3 = parseArgs(["--llvm", "true", "--clangformat", "true"])
    expect(syncVersions(opts3, llvmTools as Inputs[])).toBe(true)
    expect(opts3.llvm).toBe("true")
    expect(opts3.clangformat).toBe("true")
    expect(opts3.clangtidy).toBe(undefined)

    const opts4 = parseArgs(["--compiler", "llvm-13.0.0", "--clangtidy", "true"])
    expect(syncVersions(opts4, [...llvmTools, "compiler"] as Inputs[], getCompilerInfo("llvm-13.0.0"))).toBe(true)
    expect(opts4.compiler).toBe("llvm-13.0.0")
    expect(opts4.clangtidy).toBe("13.0.0")
    expect(opts4.clangformat).toBe(undefined)
  })
})

describe("getVersion", () => {
  it("gcovr", () => {
    expect(getVersion("gcovr", "5.0")).toBe("5.0")
    if (process.platform === "linux") {
      expect(getVersion("gcovr", "true", [22, 4])).toBe(DefaultUbuntuVersion.gcovr![22])
      expect(getVersion("gcovr", "true", [20, 4])).toBe(DefaultUbuntuVersion.gcovr![20])
      expect(getVersion("gcovr", "true", [18, 4])).toBe(DefaultUbuntuVersion.gcovr![18])
    }
  })

  it("llvm", () => {
    expect(getVersion("llvm", "13.0.0")).toBe("13.0.0")
    if (process.platform === "linux") {
      expect(getVersion("llvm", "true", [20, 4])).toBe(DefaultVersions.llvm)
      expect(getVersion("llvm", "true", [18, 4])).toBe(DefaultVersions.llvm)
      expect(getVersion("llvm", "true", [16, 4])).toBe(DefaultVersions.llvm)
    }
  })
})
