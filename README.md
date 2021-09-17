# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/aminya/setup-cpp.svg)](https://david-dm.org/aminya/setup-cpp)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

This package is designed to be **modular** and as **minimal** as possible. This will allow you to install the tools you want. It is continuously tested on Windows, Linux, and macOS.

The package can be used locally or from CI services like GitHub Actions. Stay tuned for the stable release.

# Features

`setup-cpp` can install all of these tools:

- llvm
- gcc and mingw
- cmake
- ninja
- meson
- conan
- ccache
- cppcheck
- doxygen
- gcovr
- opencppcoverage
- python
- choco
- brew

# Usage

## Inside GitHub Actions

Here is a complete cross-platform example that tests llvm and gcc. It also uses cmake, ninja, conan, cppcheck, and ccache.

`.github/workflows/ci.yml`:

```yaml
name: ci
on:
  pull_request:
  push:
    branches:
      - main
      - master

jobs:
  Test:
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os:
          - windows-2019
          - ubuntu-20.04
          - macos-10.15
        compiler:
          - llvm
          - gcc
    steps:
      - name: Setup Cpp
        uses: aminya/setup-cpp@master
        with:
          compiler: ${{ matrix.compiler }}
          cmake: true
          ninja: true
          conan: true
          cppcheck: true
          ccache: true
```

In the `compiler` entry, you can specify the version after a `-`. For example, `llvm-11`.

For the tools, instead of `true`, which choses the default version, you can pass a specific version.

### Incomplete

- [ ] msvc. It is implemented, but has bugs. See [this issue](https://github.com/aminya/cpp/issues/1)
- [ ] vcpkg (TODO)
