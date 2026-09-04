import { join } from "path"

export async function setupDmg(path: string, destDir: string) {
  const { ArchiveHdi } = await import("@shockpkg/archive-files")

  const dmg = new ArchiveHdi(path)
  await dmg.read(async (entry) => {
    await entry.extract(join(destDir, entry.path))
  })
}
