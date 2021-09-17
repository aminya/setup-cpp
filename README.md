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

### Incomplete

- [ ] msvc. It is implemented, but has bugs. See [this issue](https://github.com/aminya/cpp/issues/1)
- [ ] vcpkg (TODO)
