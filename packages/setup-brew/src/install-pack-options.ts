/**
 * The options for installing a package using brew
 */
export type BrewPackOptions = {
  /** Whether to overwrite the package if it already exists */
  overwrite?: boolean
  /** Whether to install the package as a cask */
  cask?: boolean
  /** Treat all named arguments as formulae */
  formula?: boolean
  /** If brewing fails, open an interactive debugging session */
  debug?: boolean
  /** Print install times for each package at the end of the run */
  "display-times"?: boolean
  /** Install formulae without checking for previously installed versions */
  force?: boolean
  /** Print the verification and post-install steps */
  verbose?: boolean
  /** Show what would be installed, but do not actually install anything */
  "dry-run"?: boolean
  /** Skip installing any dependencies of any kind */
  "ignore-dependencies"?: boolean
  /** Install the dependencies with specified options but do not install the formula itself */
  "only-dependencies"?: boolean
  /** Attempt to compile using the specified compiler */
  cc?: string
  /** Compile formula from source even if a bottle is provided */
  "build-from-source"?: boolean
  /** Install from a bottle if it exists */
  "force-bottle"?: boolean
  /** Install testing dependencies required to run brew test formula */
  "include-test"?: boolean
  /** Install the HEAD version */
  HEAD?: boolean
  /** Fetch the upstream repository to detect if the HEAD installation is outdated */
  "fetch-HEAD"?: boolean
  /** Retain the temporary files created during installation */
  "keep-tmp"?: boolean
  /** Generate debug symbols on build */
  "debug-symbols"?: boolean
  /** Prepare the formula for eventual bottling during installation */
  "build-bottle"?: boolean
  /** Install but skip any post-install steps */
  "skip-post-install"?: boolean
  /** Optimise bottles for the specified architecture */
  "bottle-arch"?: string
  /** Download and patch formula, then open a shell */
  interactive?: boolean
  /** Create a Git repository */
  git?: boolean
  /** Disable/enable linking of helper executables */
  binaries?: boolean
  /** Require all casks to have a checksum */
  "require-sha"?: boolean
  /** Disable/enable quarantining of downloads */
  quarantine?: boolean
  /** Adopt existing artifacts in the destination that are identical to those being installed */
  adopt?: boolean
  /** Skip installing cask dependencies */
  "skip-cask-deps"?: boolean
  /** Remove all files associated with a cask */
  zap?: boolean
  /** Target location for Applications */
  appdir?: string
  /** Target location for Keyboard Layouts */
  "keyboard-layoutdir"?: string
  /** Target location for Color Pickers */
  colorpickerdir?: string
  /** Target location for Preference Panes */
  prefpanedir?: string
  /** Target location for Quick Look Plugins */
  qlplugindir?: string
  /** Target location for Spotlight Plugins */
  mdimporterdir?: string
  /** Target location for Dictionaries */
  dictionarydir?: string
  /** Target location for Fonts */
  fontdir?: string
  /** Target location for Services */
  servicedir?: string
  /** Target location for Input Methods */
  "input-methoddir"?: string
  /** Target location for Internet Plugins */
  "internet-plugindir"?: string
  /** Target location for Audio Unit Plugins */
  "audio-unit-plugindir"?: string
  /** Target location for VST Plugins */
  "vst-plugindir"?: string
  /** Target location for VST3 Plugins */
  "vst3-plugindir"?: string
  /** Target location for Screen Savers */
  "screen-saverdir"?: string
  /** Comma-separated list of language codes to prefer for cask installation */
  language?: string
  /** Make some output more quiet */
  quiet?: boolean
}
