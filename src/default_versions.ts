const DefaultVersions: Record<string, string> = {
  llvm: "13.0.0", // https://github.com/llvm/llvm-project/releases
  clangtidy: "13.0.0",
  clangformat: "13.0.0",
  ninja: "1.10.2", // https://github.com/ninja-build/ninja/releases
  cmake: "3.22.2", // https://github.com/Kitware/CMake/releases
  gcovr: "5.0", // https://pypi.org/project/gcovr/
  conan: "1.45.0", // https://github.com/conan-io/conan/releases
  meson: "0.61.2", // https://github.com/mesonbuild/meson/releases
  python: "3.8.10",
  kcov: "v39", // https://github.com/SimonKagstrom/kcov/releases
  task: "3.11.0", // https://github.com/go-task/task/releases
  doxygen: "1.9.1", // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=doxygen
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
