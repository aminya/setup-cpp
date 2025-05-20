import { addEnv, addPath, finalizeRC, sourceRC } from "../src/index.js"

describe("envosman", () => {
  it("should be a function", () => {
    expect(addEnv).toBeInstanceOf(Function)
    expect(addPath).toBeInstanceOf(Function)
    expect(finalizeRC).toBeInstanceOf(Function)
    expect(sourceRC).toBeInstanceOf(Function)
  })
})
