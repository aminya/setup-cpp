import { isArch, setupPacmanPack } from "../src/index.js"

describe("setup-pacman", () => {
  it("exports the pacman setup API", () => {
    expect(setupPacmanPack).toBeInstanceOf(Function)
    expect(isArch).toBeInstanceOf(Function)
  })

  it("detects Arch Linux on the current host", () => {
    expect(typeof isArch()).toBe("boolean")
  })
})
