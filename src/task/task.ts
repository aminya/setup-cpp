import { addExeExt } from "patha"
import { extractTarByExe, extractZip } from "../utils/setup/extract"
import { setupBin, PackageInfo, InstallationInfo } from "../utils/setup/setupBin"

/** Get the platform name task uses in their download links */
function getTaskPlatform(platform: NodeJS.Platform) {
  switch (platform) {
    case "win32":
      return "windows"
    default:
      return platform
  }
}

/** Get the arch name task uses in their download links */
function getTaskArch(arch: string) {
  switch (arch) {
    case "x64":
      return "amd64"
    case "ia32":
    case "x86":
    case "i386":
    case "x32":
      return "386"
    default:
      return arch
  }
}

/** Get the platform data for task */
function getTaskPackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  const taskPlatform = getTaskPlatform(platform)
  const taskArch = getTaskArch(arch)
  const isZip = platform === "win32"
  const extension = isZip ? "zip" : "tar.gz"
  return {
    binRelativeDir: "",
    binFileName: addExeExt("task"),
    extractedFolderName: "",
    extractFunction: isZip ? extractZip : extractTarByExe,
    url: `https://github.com/go-task/task/releases/download/v${version}/task_${taskPlatform}_${taskArch}.${extension}`,
  }
}

export function setupTask(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  return setupBin("task", version, getTaskPackageInfo, setupDir, arch)
}
