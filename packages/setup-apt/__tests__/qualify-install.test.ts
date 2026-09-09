import { hasAptGet } from "../src/get-apt.js"
import { filterAndQualifyAptPackages } from "../src/qualify-install.js"

describe("filterAndQualifyAptPackages", () => {
  if (!hasAptGet()) {
    test.skip("filters installed packages", () => {})
    return
  }

  it("filters an installed package unless upgrade is requested", async () => {
    await expect(filterAndQualifyAptPackages([{ name: "apt" }])).resolves.toEqual([])
    await expect(filterAndQualifyAptPackages([{ name: "apt", upgrade: true }])).resolves.toEqual(["apt"])
  })
})
