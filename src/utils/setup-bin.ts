import { type InstallationInfo, type PackageInfo, setupBin as setupBinPackage } from "setup-bin"
import { maybeGetInput } from "../actions-input.js"
import { rcOptions } from "../options.js"
import { setupSevenZip } from "../sevenzip/sevenzip.js"
import { setupTar } from "../tar/tar.js"

export type { InstallationInfo, PackageInfo } from "setup-bin"

export function setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform, arch: string) => PackageInfo | Promise<PackageInfo>,
  setupDir: string,
  arch: string,
): Promise<InstallationInfo> {
  return setupBinPackage(name, version, getPackageInfo, setupDir, arch, {
    rcOptions,
    cacheTools: maybeGetInput("cache-tools") === "true" || process.env.CACHE_TOOLS === "true",
    setupSevenZip: () => setupSevenZip({ version }),
    setupTar: () => setupTar({ version, setupDir, arch }),
  })
}
