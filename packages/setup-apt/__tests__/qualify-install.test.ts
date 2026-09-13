import { execaSync } from "execa"

import { getAptEnv } from "../src/apt-env.js"
import { hasAptGet } from "../src/get-apt.js"
import { filterAndQualifyAptPackages } from "../src/qualify-install.js"

function indexedGccVariants() {
  try {
    const { stdout } = execaSync("apt-cache", ["search", "--names-only", "^gcc-[0-9]+$"], {
      env: getAptEnv("apt-get"),
      stdio: "pipe",
    })
    return stdout.split("\n")
      .map((line) => line.trim().split(/\s+/u)[0])
      .filter((name): name is string => name !== undefined && /^gcc-\d+$/u.test(name))
      .sort((first, second) => {
        const firstVersion = Number.parseInt(first.slice("gcc-".length), 10)
        const secondVersion = Number.parseInt(second.slice("gcc-".length), 10)
        return secondVersion - firstVersion
      })
  } catch {
    return []
  }
}

describe("filterAndQualifyAptPackages", () => {
  if (!hasAptGet()) {
    test.skip("filters installed packages", () => {})
    return
  }

  it("filters an installed package when upgrade is disabled", async () => {
    await expect(filterAndQualifyAptPackages([{ name: "apt", upgrade: false }])).resolves.toEqual([])
  })

  it("retains an installed package when upgrade is requested", async () => {
    await expect(filterAndQualifyAptPackages([{ name: "apt", upgrade: true }])).resolves.toEqual(["apt"])
  })

  const gccVariants = indexedGccVariants()
  if (gccVariants.length === 0) {
    test.skip("resolves the highest indexed gcc-N package", () => {})
    return
  }

  it("resolves an unversioned package to its highest indexed numeric variant", async () => {
    await expect(filterAndQualifyAptPackages([{ name: "gcc" }])).resolves.toEqual([gccVariants[0]])
  })
})
