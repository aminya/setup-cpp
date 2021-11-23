import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { error, exportVariable, warning } from "@actions/core"
import { existsSync } from "fs"
import { isCI } from "../utils/env/isci"

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
  _setupDir: string,
  arch: string,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean
): Promise<void> {
  if (process.platform !== "win32") {
    return
  }
  let toolset: string | undefined
  let VCTargetsPath: string | undefined
  if (!isCI()) {
    // TODO enable this code path once its bugs are fixed
    // https://github.com/aminya/setup-cpp/issues/1
    warning("Installing MSVC is experimental and known to fail.")
    try {
      if (version === "2015") {
        toolset = "14.0.25420.1"
        await setupChocoPack("visualcpp-build-tools", toolset, [
          "--ignore-dependencies",
          "--params",
          "'/IncludeRequired'",
        ])

        VCTargetsPath = "C:/Program Files (x86)/MSBuild/Microsoft.Cpp/v4.0/v140"
        if (existsSync(VCTargetsPath)) {
          exportVariable("VCTargetsPath", VCTargetsPath)
        }
      } else if (version === "2017") {
        toolset = "14.16"
        await setupChocoPack("visualstudio2017buildtools", "15.9.38.0", [
          "--package-parameters",
          "'--add Microsoft.VisualStudio.Workload.NativeDesktop --includeRecommended --passive'",
        ])
        VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16" // TODO verify path
      } else if (version === "2019") {
        toolset = "14.29.30133"
        await setupChocoPack("visualstudio2019buildtools", "16.11.2.0", [
          "--package-parameters",
          "'--add Microsoft.VisualStudio.Workload.NativeDesktop --includeRecommended --passive'",
        ])
        VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.29.30133"
      }
    } catch (e) {
      error(e as string | Error)
    }
  }
  // run vcvarsall.bat environment variables
  activateMSVC(VCTargetsPath, arch, toolset, sdk, uwp, spectre)
}

function activateMSVC(
  VCTargetsPath: string | undefined,
  arch: string,
  toolset: string | undefined,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean
) {
  if (VCTargetsPath !== undefined && existsSync(VCTargetsPath)) {
    exportVariable("VCTargetsPath", VCTargetsPath)
  }

  // lazy load the action so it is not executed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupMSVCDevCmd } = require("./msvc-dev-cmd/index")
  setupMSVCDevCmd(getArch(arch), sdk, toolset, uwp, spectre)
}
