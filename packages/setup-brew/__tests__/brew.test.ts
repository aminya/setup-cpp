import { join } from "path"
import spawn from "cross-spawn"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import which from "which"
import { setupBrew } from "../src/index.js"

jest.setTimeout(300000)
describe("setup-brew", () => {
  if (process.platform === "win32") {
    it.skip("should setup brew", () => {})
    return
  }
  it("should setup brew", async () => {
    const installInfo = await setupBrew()
    await testBin("brew", ["--version"], installInfo?.binDir)
  })
})

async function testBin(
  name: string,
  args: string[] | null = ["--version"],
  binDir: string | undefined = undefined,
) {
  try {
    let bin = name
    if (typeof binDir === "string") {
      console.log(`Testing the existence of ${binDir}`)
      expect(binDir).toBeDefined()
      expect(binDir).not.toHaveLength(0)
      expect(await pathExists(binDir)).toBeTruthy()
      bin = join(binDir, addExeExt(name))
    }

    if (args !== null) {
      console.log(`Running ${bin} ${args.join(" ")}`)
      const { status } = spawn.sync(bin, args, { stdio: "inherit" })
      expect(status).toBe(0)
    }

    expect((await which(name, { nothrow: true }))?.includes(bin))
  } catch (err) {
    throw new Error(`Failed to test bin ${name}: ${err}`)
  }
}
