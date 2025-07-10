// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { info } from "ci-log"
import { addEnv } from "envosman"
import { setupMSVCDevCmd } from "msvc-dev-cmd/lib.js"
import { pathExists } from "path-exists"
import { rcOptions } from "../options.js"

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

export type SetupVCVarsallOptions = {
  vsversion?: string
  VCTargetsPath?: string
  arch: string
  toolset?: string
  sdk?: string
  uwp?: boolean
  spectre?: boolean
  /** unused */
  setupDir?: string
  /** unused */
  version?: string
}

export async function setupVCVarsall(
  { vsversion, VCTargetsPath, arch, toolset, sdk, uwp, spectre }: SetupVCVarsallOptions,
) {
  if (VCTargetsPath !== undefined && (await pathExists(VCTargetsPath))) {
    info(`Adding ${VCTargetsPath} to PATH`)
    await addEnv("VCTargetsPath", VCTargetsPath, rcOptions)
  }

  await setupMSVCDevCmd(getArch(arch), sdk, toolset, uwp, spectre, vsversion)
  return undefined
}
