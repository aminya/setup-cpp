import { addExeExt } from "patha"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"

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
  const extension = platform === "win32" ? "zip" : "tar.gz"
  return {
    binRelativeDir: "",
    binFileName: addExeExt("task"),
    extractedFolderName: "",
    url: `https://github.com/go-task/task/releases/download/v${version}/task_${taskPlatform}_${taskArch}.${extension}`,
  }
}

export function setupTask(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  return setupBin("task", version, getTaskPackageInfo, setupDir, arch)
}
