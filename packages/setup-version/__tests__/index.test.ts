import {
  addVPrefix,
  compareVersion,
  defaultVersionRegex,
  getBinVersion,
  getSpecificVersionAndUrl,
  getSpecificVersions,
  getVersions,
  isBinUptoDate,
  removeVPrefix,
  semverCoerceIfInvalid,
  semverCoercedRangeIfInvalid,
} from "../src/index.js"

describe("setup-version", () => {
  it("exports the complete version utility API", () => {
    expect(getSpecificVersions).toBeInstanceOf(Function)
    expect(getVersions).toBeInstanceOf(Function)
    expect(getSpecificVersionAndUrl).toBeInstanceOf(Function)
    expect(defaultVersionRegex).toBeInstanceOf(RegExp)
    expect(getBinVersion).toBeInstanceOf(Function)
    expect(isBinUptoDate).toBeInstanceOf(Function)
    expect(semverCoerceIfInvalid).toBeInstanceOf(Function)
    expect(semverCoercedRangeIfInvalid).toBeInstanceOf(Function)
    expect(removeVPrefix).toBeInstanceOf(Function)
    expect(addVPrefix).toBeInstanceOf(Function)
    expect(compareVersion).toBeInstanceOf(Function)
  })

  it("derives minimum version selectors from a specific version", () => {
    const versions = getVersions(["3.5.2"])

    expect(versions).toEqual(new Set(["3.5.2", "3", "3.5"]))
  })

  it("adds a v prefix to an unprefixed version", () => {
    expect(addVPrefix("1.2.3")).toBe("v1.2.3")
  })

  it("preserves the existing pure version transformations", () => {
    expect(removeVPrefix("v1.2.3")).toBe(1)
    expect(addVPrefix("v1.2.3")).toBe("v1.2.3")
    expect(semverCoerceIfInvalid("1.2")).toBe("1.2.0")
    expect(semverCoercedRangeIfInvalid("1.2")).toBe("^1.2.0")
    expect(compareVersion("2.0.0", "1.0.0")).toBe(-1)
  })
})
