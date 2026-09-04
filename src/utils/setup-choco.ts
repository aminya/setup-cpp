import { setupChocoPack as setupChocoPackPackage } from "setup-choco"
import { setupChocolatey } from "../chocolatey/chocolatey.js"
import { rcOptions } from "../options.js"

export function setupChocoPack(name: string, version?: string, args: string[] = []) {
  return setupChocoPackPackage(name, version, args, {
    rcOptions,
    setupChocolatey: () => setupChocolatey(),
  })
}
