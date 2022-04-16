const DefaultVersions: Record<string, string> = {
  llvm: "14.0.0", // https://github.com/llvm/llvm-project/releases
  clangtidy: "14.0.0",
  clangformat: "14.0.0",
  ninja: "1.10.2", // https://github.com/ninja-build/ninja/releases
  cmake: "3.23.1", // https://github.com/Kitware/CMake/releases
  gcovr: "5.0", // https://pypi.org/project/gcovr/
  conan: "1.47.0", // https://github.com/conan-io/conan/releases
  meson: "0.61.4", // https://github.com/mesonbuild/meson/releases
  python: "3.8.10",
  kcov: "v40", // https://github.com/SimonKagstrom/kcov/releases
  task: "3.12.0", // https://github.com/go-task/task/releases
  doxygen: "1.9.1", // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=doxygen
  gcc: process.platform === "win32" ? "11.2.0.07112021" : "11", // https://community.chocolatey.org/packages/mingw#versionhistory and // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=gcc
}

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined) {
  if (version === "true" || (version === undefined && name in DefaultVersions)) {
    return DefaultVersions[name]
  } else {
    return version ?? ""
  }
}
