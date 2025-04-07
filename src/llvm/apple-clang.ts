import { error } from "console"
import { notice } from "ci-log"
import { addEnv } from "envosman"
import which from "which"
import { rcOptions } from "../options.js"

export async function setupAppleClang() {
  if (process.platform !== "darwin") {
    return
  }

  if (await which("clang", { nothrow: true }) !== null && await which("clang++", { nothrow: true }) !== null) {
    notice("Assuming clang is an Apple Clang compiler")
    await Promise.all([addEnv("CC", "clang", rcOptions), addEnv("CXX", "clang++", rcOptions)])
  }

  // TODO install Apple Clang automatically
  error("Apple Clang automatic installation is not supported yet")
}
