import packageJson from "../../package-version.json"
import { setupCpp } from "../lib.js"

describe("setupCpp", () => {
  it("should install nothing if no tools are installed", async () => {
    const opts = {
      "setup-cpp": false,
    }
    const result = await setupCpp(opts)
    expect(result).toStrictEqual({
      successMessages: [],
      errorMessages: [],
    })
  })

  it("should install setup-cpp if no tools are installed", async () => {
    const result = await setupCpp()

    const version = packageJson.version

    expect(result).toStrictEqual({
      successMessages: [`setup-cpp@${version} already installed`],
      errorMessages: [],
    })
  })
})
