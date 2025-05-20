import { execPowershell, execPowershellSync, getPowerShell } from "../src/index.js"

describe("exec-powershell", () => {
  it("should be a function", () => {
    expect(execPowershell).toBeInstanceOf(Function)
    expect(execPowershellSync).toBeInstanceOf(Function)
    expect(getPowerShell).toBeInstanceOf(Function)
  })
})
