import type { AddPathOptions } from "envosman"
import { untildifyUser } from "untildify-user"
import type { Inputs } from "./tool.ts"

export const rcOptions: AddPathOptions = {
  rcPath: untildifyUser("~/.cpprc"),
  guard: "cpp",
}

/**
 * The options for the setup-cpp function
 */
export type Opts = Partial<Record<Inputs, string | undefined>> & {
  "setup-cpp"?: boolean
  timeout?: string
  "node-package-manager"?: string
}
