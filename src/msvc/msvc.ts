import { setupMSVCDevCmd } from "./msvc-dev-cmd/index"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { exportVariable } from "@actions/core"
import { existsSync } from "fs"
import { arch as osArch } from "os"

type MSVCVersion = "2015" | "2017" | "2019" | string

function getArch(arch: string): string {
  switch (arch) {
    case "x32":
    case "32":
    case "ia32": {
      return "x86"
    }
    case "64": {
      return "x64"
    }
    default: {
      return arch
    }
  }
}

export async function setupMSVC(
  version: MSVCVersion,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean,
  arch = osArch()
): Promise<void> {
  let toolset: string | undefined
  if (version === "2015") {
    toolset = "14.0.25420.1"
    await setupChocoPack("visualcpp-build-tools", toolset, ["--ignore-dependencies", "--params", "'/IncludeRequired'"])

    const VCTargetsPath = "C:\\Program Files (x86)\\MSBuild\\Microsoft.Cpp\\v4.0\\v140"
    if (existsSync(VCTargetsPath)) {
      exportVariable("VCTargetsPath", VCTargetsPath)
    }
  } else if (version === "2017") {
    toolset = "15.9.38.0"
    await setupChocoPack("visualstudio2017buildtools", toolset, [
      "--package-parameters",
      "add Microsoft.VisualStudio.Workload.NativeDesktop --includeRecommended --passive",
    ])
  } else if (version === "2019") {
    toolset = "16.11.2.0"
    await setupChocoPack("visualstudio2019buildtools", toolset, [
      "--package-parameters",
      "add Microsoft.VisualStudio.Workload.NativeDesktop --includeRecommended --passive",
    ])
  }
  setupMSVCDevCmd(getArch(arch), sdk, toolset, uwp, spectre)
}
