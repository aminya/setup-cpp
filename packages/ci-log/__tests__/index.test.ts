import { error, info, notice, success, warning } from "../src/index.js"

describe("ci-log", () => {
  it("should be a function", () => {
    expect(error).toBeInstanceOf(Function)
    expect(success).toBeInstanceOf(Function)
    expect(warning).toBeInstanceOf(Function)
    expect(notice).toBeInstanceOf(Function)
    expect(info).toBeInstanceOf(Function)
  })
})
