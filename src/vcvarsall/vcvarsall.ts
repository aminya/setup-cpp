import { exportVariable } from "@actions/core"
import { existsSync } from "fs"

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

export function activateMSVC(
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
  const { setupMSVCDevCmd } = require("msvc-dev-cmd/index")
  setupMSVCDevCmd(getArch(arch), sdk, toolset, uwp, spectre)
}
