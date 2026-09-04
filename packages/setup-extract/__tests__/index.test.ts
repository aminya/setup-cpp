import { tmpdir } from "os"
import { join } from "path"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "fs/promises"

import { execa } from "execa"
import which from "which"

import {
  ArchiveType,
  extract7Zip,
  extractExe,
  extractTar,
  extractTarByExe,
  extractXar,
  extractZip,
  getArchiveType,
  getExtractFunction,
} from "../src/index.js"
import type { ArchiveToolDependencies, ExtractFunction } from "../src/index.js"

describe("setup-extract", () => {
  it("exports the archive extraction API", () => {
    const extractFunctions = [
      extract7Zip,
      extractExe,
      extractTar,
      extractTarByExe,
      extractXar,
      extractZip,
    ]
    const extractFunction: ExtractFunction = extractTarByExe
    const dependencies: ArchiveToolDependencies = {}

    expect(extractFunctions).toHaveLength(6)
    expect(extractFunction).toBeInstanceOf(Function)
    expect(dependencies).toEqual({})
    expect(getExtractFunction(ArchiveType.Zip)).toBe(extractZip)
  })

  it("classifies supported archive suffixes", () => {
    expect(getArchiveType("tool.tar.gz")).toBe(ArchiveType.TarGz)
    expect(getArchiveType("tool.zip")).toBe(ArchiveType.Zip)
    expect(getArchiveType("tool.exe")).toBe(ArchiveType.SevenZip)
  })

  it("extracts a tar archive without setting up tar when tar is available", async () => {
    if (which.sync("tar", { nothrow: true }) === null) {
      return
    }

    const tempDir = await mkdtemp(join(tmpdir(), "setup-extract-regression-"))
    const sourceDir = join(tempDir, "source")
    const archive = join(tempDir, "tool.tar")
    const destination = join(tempDir, "destination")

    try {
      await mkdir(sourceDir)
      await writeFile(join(sourceDir, "tool.txt"), "setup-extract")
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
      await expect(readFile(join(destination, "tool.txt"), "utf8")).resolves.toBe("setup-extract")
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})
