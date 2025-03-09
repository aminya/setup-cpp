import memoize from "memoizee"
import { semverCoerceIfInvalid } from "../utils/setup/version.ts"
function majorLLVMVersion_(version: string) {
  const coeredVersion = semverCoerceIfInvalid(version)
  return Number.parseInt(coeredVersion.split(".")[0], 10)
}

export const majorLLVMVersion = memoize(majorLLVMVersion_)
