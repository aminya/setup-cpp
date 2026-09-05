import { type InstallationInfo, type PackageInfo, setupBin as setupBinPackage } from "setup-bin"
import { rcOptions } from "../options.js"
import { setupSevenZip } from "../sevenzip/sevenzip.js"
import { setupTar } from "../tar/tar.js"
import { getLegacyArchiveSetupOptions, shouldCacheTools } from "./archive-bootstrap.js"

export type { InstallationInfo, PackageInfo } from "setup-bin"

export function setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform, arch: string) => PackageInfo | Promise<PackageInfo>,
  setupDir: string,
  arch: string,
): Promise<InstallationInfo> {
  const archiveSetupOptions = getLegacyArchiveSetupOptions()

  return setupBinPackage(name, version, getPackageInfo, setupDir, arch, {
    rcOptions,
    cacheTools: shouldCacheTools(),
    setupSevenZip: () => setupSevenZip(archiveSetupOptions.setupSevenZip),
    setupTar: () => setupTar(archiveSetupOptions.setupTar),
  })
}
