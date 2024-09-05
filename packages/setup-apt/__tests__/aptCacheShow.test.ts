import { ubuntuVersion as getUbuntuVersion } from "../../../src/utils/env/ubuntu_version.js"
import { aptCacheShow } from "../src/qualify-install.js"

describe("aptCacheShow", () => {
  const ubuntuVersionP = getUbuntuVersion()
  let ubuntuVersion: number[] | null

  beforeAll(async () => {
    ubuntuVersion = await ubuntuVersionP
  })

  it("should find the package if installed", async () => {
    if (ubuntuVersion === null) {
      return
    }

    const info = await aptCacheShow("dpkg", undefined)
    expect(info).not.toBeUndefined()
    expect(info?.name).toBe("dpkg")
  })

  it("should find the version of the package if installed", async () => {
    if (ubuntuVersion === null) {
      return
    }

    const info = await aptCacheShow("gcc", undefined)

    expect(info).not.toBeUndefined()
    expect(info?.name).toBe("gcc")

    if (ubuntuVersion[0] === 22) {
      expect(info?.version).toBe("4:11.2.0-1ubuntu1")
    }
  })

  it("should find the version of the package if installed", async () => {
    if (ubuntuVersion === null) {
      return
    }

    if (ubuntuVersion[0] !== 22) {
      return
    }
    const info = await aptCacheShow("gcc", "4:11.2.0-1ubuntu1")

    expect(info).not.toBeUndefined()
    expect(info?.name).toBe("gcc")
    expect(info?.version).toBe("4:11.2.0-1ubuntu1")
  })

  it("will not find the package via imprecise version", async () => {
    const info = await aptCacheShow("gcc", "11")

    expect(info).toBeUndefined()
  })
})
