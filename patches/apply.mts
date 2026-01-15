import { existsSync } from "fs"
import path from "path"
import { applyPatchToDir } from "@pnpm/patching.apply-patch"
import fs from "fs/promises"

async function main() {
  const patches = (await fs.readdir("./patches")).filter(patch => patch.endsWith(".patch"))
  const results = await Promise.all(patches.map(applyPatch))

  if (results.some(result => result === PatchResult.Failed)) {
    console.error("Failed to apply some patches")
    process.exit(1)
  } else {
    console.log("All patches applied successfully")
  }
}

enum PatchResult {
  Success = 0,
  Failed = 1,
  Skipped = 2,
}

async function applyPatch(patch: string) {
  const patchFilePath = path.resolve("./patches", patch)
  const packageName = parsePackageName(patchFilePath)

  const patchedDir = path.resolve("./node_modules", packageName)

  if (existsSync(path.join(patchedDir, ".patched"))) {
    console.log(`Skipping ${patch} because it is already patched`)
    return PatchResult.Skipped
  }

  console.log(`Applying patch ${patchFilePath} to ${patchedDir}`)
  const result = applyPatchToDir({
    patchedDir,
    patchFilePath,
  })
  // create .patched file in the patchedDir
  await fs.writeFile(path.join(patchedDir, ".patched"), patch)
  if (!result) {
    console.error(`Failed to apply patch ${patch}`)
    return PatchResult.Failed
  }
  return PatchResult.Success
}

/**
 * parsePackageName("@actions__http-client.patch") // "@actions/http-client"
 * parsePackageName("http-client.patch") // "http-client"
 */
function parsePackageName(patch: string) {
  return path.basename(patch, path.extname(patch)).replace("__", "/")
}

main()
