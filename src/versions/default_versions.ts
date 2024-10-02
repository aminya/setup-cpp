import { isArch } from "../utils/env/isArch.js"

const defaultLLVM = process.platform === "darwin" && process.arch === "x64"
  ? "15.0.7"
  : "18.1.8"

/**
 * Default versions for the tools
 * DefaultUbuntuVersion overrides the default version for the tools on Ubuntu
 */
export const DefaultVersions: Record<string, string | undefined> = {
  // https://github.com/llvm/llvm-project/releases
  llvm: defaultLLVM,
  clang: defaultLLVM,
  "clang++": defaultLLVM,
  "clang-tidy": defaultLLVM,
  clangtidy: defaultLLVM,
  "clang-format": defaultLLVM,
  clangformat: defaultLLVM,
  ninja: "1.12.1", // https://github.com/ninja-build/ninja/releases
  cmake: "3.30.4", // https://github.com/Kitware/CMake/releases
  meson: "1.5.2", // https://github.com/mesonbuild/meson/releases
  kcov: "42", // https://github.com/SimonKagstrom/kcov/releases
  task: "3.39.2", // https://github.com/go-task/task/releases
  doxygen: isArch() ? "1.12.0-2" : "1.12.0", // https://www.doxygen.nl/download.html // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=doxygen // https://formulae.brew.sh/formula/doxygen // https://archlinux.org/packages/extra/x86_64/doxygen/
  gcc: process.platform === "win32"
    ? "14.2.0posix-18.1.8-12.0.0-ucrt-r1"
    : "", // use the default version on Ubuntu, Fedora, Arch, macOS, etc.
  // mingw: isArch() ? "12.2.0-1" : "8", // https://archlinux.org/packages/extra/x86_64/mingw-w64-gcc/
  powershell: "7.4.5",
}

export const MinVersions: Record<string, string | undefined> = {
  pip: "22.2.0",
  python: "3.7.9",
}

/// If an ubuntu versions is not in this map:
// - the newer ubuntu versions use the first entry (e.g. v20),
// - the older ones use ""
export const DefaultUbuntuVersion: Record<string, Record<number, string> | undefined> = {
  // https://packages.ubuntu.com/search?suite=all&arch=any&searchon=names&keywords=mingw-w64
  mingw: {
    24: "8.0.0-1",
    22: "8.0.0-1",
    20: "7.0.0-2",
  },
  gcovr: {
    24: "6.0",
    22: "6.0",
    20: "6.0",
    18: "5.0",
  },
  meson: {
    24: "1.0.0",
    22: "1.0.0",
    20: "1.0.0",
    18: "0.61.4",
  },
  nala: {
    24: "",
    22: "",
    21: "legacy",
    20: "legacy",
    18: "legacy",
    16: "legacy",
    14: "legacy",
  },
  kcov: {
    24: "42-binary",
    22: "42-binary",
    20: "40-binary", // https://github.com/SimonKagstrom/kcov/releases
    18: "40",
    16: "40",
    14: "40",
  },
  doxygen: {
    24: "1.11.0",
    22: "1.11.0",
    20: "1.10.0",
    18: "1.10.0",
  },
}
