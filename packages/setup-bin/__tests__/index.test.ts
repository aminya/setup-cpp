import { tmpdir } from "os"
import { join } from "path"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "fs/promises"

import { execa } from "execa"
import which from "which"

import { ArchiveType, extractExe, extractTarByExe, getArchiveType, getExtractFunction } from "../src/index.js"

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

  it("does not set up tar when tar is already available", async () => {
    if (which.sync("tar", { nothrow: true }) === null) {
      return
    }

    const tempDir = await mkdtemp(join(tmpdir(), "setup-bin-regression-"))
    const sourceDir = join(tempDir, "source")
    const archive = join(tempDir, "tool.tar")
    const destination = join(tempDir, "destination")

    try {
      await mkdir(sourceDir)
      await writeFile(join(sourceDir, "tool.txt"), "setup-bin")
      await execa("tar", ["cf", archive, "-C", sourceDir, "tool.txt"])

      let setupTarCalls = 0
      await expect(
        extractTarByExe(archive, destination, 0, [], {
          setupTar: async () => {
            setupTarCalls += 1
            throw new Error("setupTar should not be called")
          },
        }),
      ).resolves.toBe(destination)

      expect(setupTarCalls).toBe(0)
      await expect(readFile(join(destination, "tool.txt"), "utf8")).resolves.toBe("setup-bin")
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})
