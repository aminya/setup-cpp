/**
 * The information about an installation result
 */

export type InstallationInfo = {
  /** The install dir of the package (Defaults to `undefined`) */
  installDir?: string
  /** The bin dir of the package (Defaults to `/usr/bin`) */
  binDir: string
  /** The bin path of the package (Defaults to `undefined`) */
  bin?: string
}
