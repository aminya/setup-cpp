import which from "which"

import {
  addPythonBaseExecPrefix,
  getPythonBaseExecPrefix,
  hasPipxBinary,
  hasPipxModule,
  isExternallyManaged,
  setupPipPack,
  setupPipPackSystem,
  setupPipPackWithPython,
} from "../src/index.js"

describe("setup-pip", () => {
  it("exports the complete pip and pipx API", () => {
    expect(setupPipPack).toBeInstanceOf(Function)
    expect(setupPipPackWithPython).toBeInstanceOf(Function)
    expect(hasPipxBinary).toBeInstanceOf(Function)
    expect(hasPipxModule).toBeInstanceOf(Function)
    expect(setupPipPackSystem).toBeInstanceOf(Function)
    expect(addPythonBaseExecPrefix).toBeInstanceOf(Function)
    expect(getPythonBaseExecPrefix).toBeInstanceOf(Function)
    expect(isExternallyManaged).toBeInstanceOf(Function)
  })

  it("gets the base exec prefix from an available Python binary", async () => {
    const python = which.sync("python", { nothrow: true }) ?? which.sync("python3", { nothrow: true })

    if (python === null) {
      return
    }

    const prefix = await getPythonBaseExecPrefix(python)

    expect(prefix).toBeTruthy()
  })
})
