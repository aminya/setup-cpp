import { untildifyUser } from "../src/index.js"

describe("untildify-user", () => {
  it("should be a function", () => {
    expect(untildifyUser).toBeInstanceOf(Function)
  })
})
