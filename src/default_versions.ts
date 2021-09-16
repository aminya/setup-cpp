const DefaultVersions: Record<string, string> = {
  msvc: "2019",
  llvm: "11",
  ninja: "1.10.2",
  cmake: "3.20.2",
}

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined) {
  if (version === "true" || (version === undefined && name in DefaultVersions)) {
    return DefaultVersions[name]
  } else {
    return version
  }
}
