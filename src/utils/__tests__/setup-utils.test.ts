import { setupDmg } from "setup-dmg"
import { setupDnfPack } from "setup-dnf"
import { getArchiveType } from "setup-extract"
import { setupPacmanPack } from "setup-pacman"
import { getBinVersion } from "setup-version"
import { untildifyUser } from "untildify-user"
import { getLegacyArchiveSetupOptions, shouldCacheTools } from "../archive-bootstrap.js"
import { setupBin } from "../setup-bin.js"
import { setupChocoPack } from "../setup-choco.js"
import { createPythonResolver, setupPipPack } from "../setup-pip.js"

describe("setup utility package integration", () => {
  it("resolves root adapters and package barrels", () => {
    expect(setupBin).toBeInstanceOf(Function)
    expect(setupPipPack).toBeInstanceOf(Function)
    expect(setupChocoPack).toBeInstanceOf(Function)
    expect(setupDmg).toBeInstanceOf(Function)
    expect(setupDnfPack).toBeInstanceOf(Function)
    expect(setupPacmanPack).toBeInstanceOf(Function)
    expect(getBinVersion).toBeInstanceOf(Function)
    expect(getArchiveType).toBeInstanceOf(Function)
  })

  it("preserves the legacy archive bootstrap arguments", () => {
    const options = getLegacyArchiveSetupOptions()

    expect(options.setupSevenZip).toEqual({ version: "" })
    expect(options.setupTar).toEqual({ version: "", arch: process.arch, setupDir: untildifyUser("~/tar") })
  })

  it("preserves cache-tools environment behavior", () => {
    const previousCacheTools = process.env.CACHE_TOOLS
    process.env.CACHE_TOOLS = undefined
    expect(shouldCacheTools()).toBe(false)

    process.env.CACHE_TOOLS = "true"
    expect(shouldCacheTools()).toBe(true)

    if (previousCacheTools === undefined) {
      process.env.CACHE_TOOLS = undefined
    } else {
      process.env.CACHE_TOOLS = previousCacheTools
    }
  })

  it("memoizes the Python setup pipeline", async () => {
    const setupCalls: string[] = []
    const resolvePython = createPythonResolver(
      ({ version }) => {
        setupCalls.push(version)
        return Promise.resolve({ bin: `/python/${version}` })
      },
      () => Promise.resolve("default-version"),
    )

    const first = await resolvePython()
    const second = await resolvePython("ignored-version")

    expect(first).toBe("/python/default-version")
    expect(second).toBe(first)
    expect(setupCalls).toEqual(["default-version"])
  })
})
