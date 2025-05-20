import spawn from "cross-spawn"
import { pathExists } from "path-exists"
import { join } from "path/posix"
import { addExeExt } from "patha"
import which from "which"

export async function testBin(
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
