import { Mounter } from "@shockpkg/hdi-mac"
import { execRoot } from "admina"

export async function setupDmg(path: string, destDir: string) {
  // mount the dmg
  const mounter = new Mounter()
  const { devices, eject } = await mounter.attach(path)

  const device = devices[0]

  // copy the dmg contents to the setup directory
  await execRoot("cp", ["-R", `${device.mountPoint}/`, destDir])

  // eject the disk
  await eject()
}
