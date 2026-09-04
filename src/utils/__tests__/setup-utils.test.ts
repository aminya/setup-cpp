import { setupDmg } from "setup-dmg"
import { setupDnfPack } from "setup-dnf"
import { getArchiveType } from "setup-extract"
import { setupPacmanPack } from "setup-pacman"
import { getBinVersion } from "setup-version"
import { setupBin } from "../setup-bin.js"
import { setupChocoPack } from "../setup-choco.js"
import { setupPipPack } from "../setup-pip.js"

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
})
