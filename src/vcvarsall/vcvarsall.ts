// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { info } from "ci-log"
import { setupMSVCDevCmd } from "msvc-dev-cmd/lib.js"
import { pathExists } from "path-exists"
import { addEnv } from "../utils/env/addEnv"

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

export async function setupVCVarsall(
  vsversion: string,
  VCTargetsPath: string | undefined,
  arch: string,
  toolset: string | undefined,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean,
) {
  if (VCTargetsPath !== undefined && (await pathExists(VCTargetsPath))) {
    info(`Adding ${VCTargetsPath} to PATH`)
    await addEnv("VCTargetsPath", VCTargetsPath)
  }

  setupMSVCDevCmd(getArch(arch), sdk, toolset, uwp, spectre, vsversion)
}
