import { syncVersions, getVersion } from "../versions/versions"
import { getCompilerInfo, Inputs, parseArgs } from "../main"

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

describe("syncVersion", () => {
  it("Syncs llvm tools versions", () => {
    const llvmTools = ["llvm", "clangtidy", "clangformat"] as Inputs[]
    expect(syncVersions(parseArgs(["--llvm", "14.0.0", "--clangtidy", "true"]), llvmTools)).toBe(true)
    expect(syncVersions(parseArgs(["--llvm", "13.0.0", "--clangtidy", "true"]), llvmTools)).toBe(true)
    expect(syncVersions(parseArgs(["--llvm", "13.0.0", "--clangtidy", "12.0.0"]), llvmTools)).toBe(false)

    const opts = parseArgs(["--llvm", "14.0.0", "--clangtidy", "true"])
    expect(syncVersions(opts, llvmTools)).toBe(true)
    expect(opts.llvm).toBe(opts.clangtidy)
  })
})

describe("getVersion", () => {
  it("gcovr", () => {
    expect(getVersion("gcovr", "5.0")).toBe("5.0")
    if (process.platform === "linux") {
      expect(getVersion("gcovr", "true", [22, 4])).toBe("5.2")
      expect(getVersion("gcovr", "true", [20, 4])).toBe("5.2")
      expect(getVersion("gcovr", "true", [18, 4])).toBe("5.0")
    }
  })

  it("llvm", () => {
    expect(getVersion("llvm", "13.0.0")).toBe("13.0.0")
    if (process.platform === "linux") {
      expect(getVersion("llvm", "true", [20, 4])).toBe("15.0.6-ubuntu-18.04")
      expect(getVersion("llvm", "true", [18, 4])).toBe("15.0.6-ubuntu-18.04")
      expect(getVersion("llvm", "true", [16, 4])).toBe("15.0.6-ubuntu-18.04")
    }
  })
})
