import { isArch } from "../utils/env/isArch"

// passing "" to a tool installed by a package manager (apt, brew, choco) will result in the default version of that package manager.
// the directly downloaded tools require a given version ("" doesn't work).

export const DefaultVersions: Record<string, string> = {
  llvm: process.platform === "darwin" ? "15.0.3" : "15.0.4", // https://github.com/llvm/llvm-project/releases
  clangtidy: process.platform === "darwin" ? "15.0.3" : "15.0.4",
  clangformat: process.platform === "darwin" ? "15.0.3" : "15.0.4",
  ninja: "1.11.1", // https://github.com/ninja-build/ninja/releases
  cmake: "3.25.0", // https://github.com/Kitware/CMake/releases
  gcovr: "5.2", // https://pypi.org/project/gcovr/
  conan: "1.54.0", // https://github.com/conan-io/conan/releases
  meson: "0.64.0", // https://github.com/mesonbuild/meson/releases
  kcov: "40", // https://github.com/SimonKagstrom/kcov/releases
  task: "3.18.0", // https://github.com/go-task/task/releases
  doxygen: isArch() ? "1.9.5-1" : "1.9.5", // https://www.doxygen.nl/download.html // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=doxygen // https://formulae.brew.sh/formula/doxygen // https://archlinux.org/packages/extra/x86_64/doxygen/
  gcc: isArch() ? "11" : "12", // https://github.com/brechtsanders/winlibs_mingw/releases and // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=gcc
}

/// If an ubuntu versions is not in this map:
// - the newer ubuntu versions use the first entry (e.g. v20),
// - the older ones use ""
export const DefaultLinuxVersion: Record<string, Record<number, string>> = {
  gcc: {
    22: "12",
    20: "11",
    18: "11",
    16: "11",
    14: "11",
  },
  llvm: {
    22: "15.0.6-ubuntu-18.04",
    20: "15.0.6-ubuntu-18.04",
    18: "15.0.6-ubuntu-18.04",
    16: "15.0.6-ubuntu-18.04",
    14: "13.0.0-ubuntu-16.04",
  },
  clangtidy: {
    22: "15.0.6-ubuntu-18.04",
    20: "15.0.6-ubuntu-18.04",
    18: "15.0.6-ubuntu-18.04",
    16: "15.0.6-ubuntu-18.04",
    14: "13.0.0-ubuntu-16.04",
  },
  clangformat: {
    22: "15.0.6-ubuntu-18.04",
    20: "15.0.6-ubuntu-18.04",
    18: "15.0.6-ubuntu-18.04",
    16: "15.0.6-ubuntu-18.04",
    14: "13.0.0-ubuntu-16.04",
  },
  gcovr: {
    22: "5.2",
    20: "5.2",
    18: "5.0",
  },
  meson: {
    20: "0.63.3",
    18: "0.61.4",
  },
  nala: {
    22: "",
    21: "legacy",
    20: "legacy",
    18: "legacy",
    16: "legacy",
    14: "legacy",
  },
  kcov: {
    22: "40",
    20: "40-binary", // https://github.com/SimonKagstrom/kcov/releases
    18: "40",
    16: "40",
    14: "40",
  },
}
