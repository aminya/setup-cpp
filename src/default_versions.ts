const DefaultVersions: Record<string, string> = {
  msvc: "2019",
  vcvarsall: "2019",
  llvm: "13.0.0",
  ninja: "1.10.2",
  cmake: "3.22.0",
  gcovr: "5.0",
  conan: "1.42.1",
  meson: "0.60.1",
  python: "3.10.0",
  gcc: process.platform === "win32" ? "11.2.0.07112021" : "11",
}

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined) {
  if (version === "true" || (version === undefined && name in DefaultVersions)) {
    return DefaultVersions[name]
  } else {
    return version ?? ""
  }
}
