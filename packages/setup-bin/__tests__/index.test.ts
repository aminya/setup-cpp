import { ArchiveType, extractExe, getArchiveType, getExtractFunction } from "../src/index.js"

describe("setup-bin", () => {
  it("exports the direct-download archive API", () => {
    expect(extractExe).toBeInstanceOf(Function)
    expect(getExtractFunction(ArchiveType.Zip)).toBeInstanceOf(Function)
  })

  it("classifies supported archive suffixes", () => {
    expect(getArchiveType("tool.tar.gz")).toBe(ArchiveType.TarGz)
    expect(getArchiveType("tool.zip")).toBe(ArchiveType.Zip)
    expect(getArchiveType("tool.exe")).toBe(ArchiveType.SevenZip)
  })
})
