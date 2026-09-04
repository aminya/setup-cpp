import { once } from "events"
import { createServer } from "http"
import {
  getLLVMAptRepositoryReleaseUrl,
  isLLVMAptRepositoryOnline,
  withLLVMAptRepository,
} from "../llvm_apt_installer.js"

const installerScript = `
BASE_URL="https://apt.llvm.org"
NEW_DEBIAN_DISTROS=("trixie" "forky" "unstable")
declare -A LLVM_VERSION_PATTERNS
LLVM_VERSION_PATTERNS[10]="-10"
LLVM_VERSION_PATTERNS[11]="-11"
LLVM_VERSION_PATTERNS[12]="-12"
LLVM_VERSION_PATTERNS[13]="-13"
LLVM_VERSION_PATTERNS[24]=""
`

const ubuntuOsRelease = `
ID=ubuntu
VERSION_CODENAME=noble
UBUNTU_CODENAME=noble
`

describe("getLLVMAptRepositoryReleaseUrl", () => {
  it.each([10, 11, 12, 13])("builds the Noble LLVM %s repository URL", (majorVersion) => {
    expect(getLLVMAptRepositoryReleaseUrl(installerScript, ubuntuOsRelease, majorVersion)).toBe(
      `https://apt.llvm.org/noble/dists/llvm-toolchain-noble-${majorVersion}/Release`,
    )
  })

  it("builds the suffixless repository URL declared by the downloaded installer", () => {
    expect(getLLVMAptRepositoryReleaseUrl(installerScript, ubuntuOsRelease, 24)).toBe(
      "https://apt.llvm.org/noble/dists/llvm-toolchain-noble/Release",
    )
  })

  it.each(["trixie", "forky", "unstable"])("uses the unstable suite mapping for Debian %s", (codename) => {
    const osRelease = `ID=debian\nVERSION_ID=13\nVERSION_CODENAME=${codename}\n`
    expect(getLLVMAptRepositoryReleaseUrl(installerScript, osRelease, 10)).toBe(
      "https://apt.llvm.org/unstable/dists/llvm-toolchain-10/Release",
    )
  })

  it("does not guess a base URL when the downloaded installer does not declare one", () => {
    const scriptWithoutBaseUrl = installerScript.replace("BASE_URL=\"https://apt.llvm.org\"\n", "")
    expect(getLLVMAptRepositoryReleaseUrl(scriptWithoutBaseUrl, ubuntuOsRelease, 10)).toBeUndefined()
  })
})

describe("withLLVMAptRepository", () => {
  it("returns before adding an unavailable apt repository", async () => {
    let addAptRepositoryCalled = false
    let repositoryChecked = false

    const result = await withLLVMAptRepository(
      installerScript,
      ubuntuOsRelease,
      10,
      () => {
        addAptRepositoryCalled = true
        return Promise.resolve("installed")
      },
      () => {
        repositoryChecked = true
        return Promise.resolve(false)
      },
    )

    expect(result).toBeUndefined()
    expect(repositoryChecked).toBe(true)
    expect(addAptRepositoryCalled).toBe(false)
  })

  it("runs the apt installation callback when the repository is available", async () => {
    let addAptRepositoryCalled = false

    const result = await withLLVMAptRepository(
      installerScript,
      ubuntuOsRelease,
      10,
      () => {
        addAptRepositoryCalled = true
        return Promise.resolve("installed")
      },
      () => Promise.resolve(true),
    )

    expect(result).toBe("installed")
    expect(addAptRepositoryCalled).toBe(true)
  })
})

describe("isLLVMAptRepositoryOnline", () => {
  it("times out a Release probe when the server never responds", async () => {
    const server = createServer(() => {})
    server.listen(0, "127.0.0.1")
    await once(server, "listening")

    try {
      const address = server.address()
      if (address === null || typeof address === "string") {
        throw new Error("Expected the test server to listen on a TCP port")
      }

      const startedAt = Date.now()
      await expect(isLLVMAptRepositoryOnline(`http://127.0.0.1:${address.port}/Release`, 50)).resolves.toBe(false)
      expect(Date.now() - startedAt).toBeLessThan(1000)
    } finally {
      server.close()
      await once(server, "close")
    }
  })
})
