const DefaultVersions: Record<string, string> = {
  msvc: "2019",
  llvm: "11",
  ninja: "1.10.2",
  cmake: "3.20.2",
  gcovr: "5.0",
  conan: "1.40.1",
  meson: "0.59.1",
  python: "3.x",
  gcc: "11.2.0",
}

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined) {
  if (version === "true" || (version === undefined && name in DefaultVersions)) {
    return DefaultVersions[name]
  } else {
    return version
  }
}
